import React, { useEffect, useRef, useState } from 'react';
import { useGetOwnedGroupsQuery, useUpdateTaskMutation } from '../slices/usersApiSlice';
import { toast } from 'react-toastify';

const PublishTaskModal = ({ isOpen, onClose, task, onPublish }) => {
  const dialogRef = useRef(null);
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const { data: groups = [] } = useGetOwnedGroupsQuery();
  const [updateTask] = useUpdateTaskMutation();

  useEffect(() => {
    if (isOpen && dialogRef.current) dialogRef.current.showModal();
    if (!isOpen && dialogRef.current?.open) dialogRef.current.close();
  }, [isOpen]);

  const handlePublish = async () => {
    try {
      await updateTask({
        taskId: task._id,
        taskData: {
          visibility: 'group',
          group: selectedGroupId,
        },
      }).unwrap();
  
      toast.success('Task published to group!');
      onPublish(); // triggers refetch and closes modal
    } catch (err) {
      toast.error('Failed to publish task to group');
    }
  };
  

  return (
    <dialog ref={dialogRef} style={{ width: '50%', padding: '20px' }}>
      <h4>Publish Task: {task?.title}</h4>
      <select
        className="form-select my-3"
        value={selectedGroupId}
        onChange={(e) => setSelectedGroupId(e.target.value)}
      >
        <option value="">-- Select a Group --</option>
        {groups.map((g) => (
          <option key={g._id} value={g._id}>{g.name}</option>
        ))}
      </select>

      <div className="d-flex justify-content-end gap-2">
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" disabled={!selectedGroupId} onClick={handlePublish}>
          Publish
        </button>
      </div>
    </dialog>
  );
};

export default PublishTaskModal;
