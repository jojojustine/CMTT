import React, { useEffect, useRef } from 'react';

const TaskDetailsModal = ({ isOpen, task, onClose, onComplete, onEdit, onDelete })  => {
  const dialogRef = useRef();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen && dialog) dialog.showModal();
    else if (dialog && dialog.open) dialog.close();
  }, [isOpen]);

  if (!task) return null;

  return (
    <>
      <style>
        {`dialog::backdrop { backdrop-filter: blur(5px); background-color: rgba(0, 0, 0, 0.3); }`}
      </style>

      <dialog ref={dialogRef} style={{ width: '75%', maxWidth: '800px', padding: '20px', borderRadius: '10px' }}>
        <h2>{task.title}</h2>
        <p><strong>Description:</strong> {task.description}</p>
        <p><strong>Tags:</strong> {task.tags?.join(', ') || 'None'}</p>
        <p><strong>Visibility:</strong> {task.visibility}</p>
        <p><strong>Resource:</strong> 
          {task.resourceLink ? (
            <a href={task.resourceLink} target="_blank" rel="noopener noreferrer">{task.resourceLink}</a>
          ) : ' None'}
        </p>
        <p><strong>Status:</strong> {task.status}</p>
        <p><strong>Created:</strong> {new Date(task.createdAt).toLocaleString()}</p>
        <p><strong>Updated:</strong> {new Date(task.updatedAt).toLocaleString()}</p>

        <div style={{ marginTop: '10px' }}>
          {task.status !== 'Completed' && (
            <button onClick={() => onComplete(task._id)}>Mark as Complete</button>
          )}
          <button onClick={() => onEdit(task)}>Edit</button>
          <button onClick={onClose} style={{ marginLeft: '10px' }}>Close</button>
        
        <button
  onClick={() => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task._id);
      onClose();
    }
  }}
  style={{ marginLeft: '10px', color: 'white', backgroundColor: 'red' }}
>
  Delete
</button>
</div>
      </dialog>
    </>
  );
};

export default TaskDetailsModal;
