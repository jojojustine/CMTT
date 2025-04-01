import React, { useEffect, useRef, useState } from 'react';
import { useGetOwnedGroupsQuery, useUpdateTaskMutation } from '../slices/usersApiSlice';

const PublishTaskModal = ({ isOpen, onClose, task, onPublish }) => {
  const dialogRef = useRef(null);
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const { data: groups = [] } = useGetOwnedGroupsQuery();
  const [updateTask] = useUpdateTaskMutation();

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (!isOpen && dialogRef.current?.open) {
      dialogRef.current.close();
    }
  }, [isOpen]);

  const handlePublish = async () => {
    try {
      await updateTask({
        id: task._id,
        visibility: 'group',
        group: selectedGroupId,
      }).unwrap();

      onPublish();
      onClose();
    } catch (err) {
      alert('Failed to publish task to group');
    }
  };

  return (
    <dialog ref={dialogRef} style={{ width: '50%', padding: '20px', borderRadius: '10px' }}>
      <h4>Publish Task: {task.title}</h4>

      <div className="mb-3">
        <label>Select Group</label>
        <select
          className="form-select"
          value={selectedGroupId}
          onChange={(e) => setSelectedGroupId(e.target.value)}
        >
          <option value="">-- Select a Group --</option>
          {groups.map((group) => (
            <option key={group._id} value={group._id}>
              {group.name}
            </option>
          ))}
        </select>
      </div>

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
