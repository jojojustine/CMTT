import React, { useState, useEffect, useRef } from 'react';

const EditTaskModal = ({ isOpen, onClose, task, onSave }) => {
  const dialogRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: '',
    visibility: '',
    tags: '',
    resourceLink: ''
  });

  // When task is loaded into modal
  useEffect(() => {
    if (task) {
      const adjustedStatus = task.status === 'complete' ? 'published' : task.status;

      setFormData({
        title: task.title || '',
        description: task.description || '',
        status: adjustedStatus,
        visibility: task.visibility || '',
        tags: task.tags?.join(', ') || '',
         resourceLink: task.resourceLink || ''
      });
    }
  }, [task]);

  // Show or close the dialog
  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen && dialog) {
      dialog.showModal();
    } else if (dialog && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTask = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()),
    };

    onSave(updatedTask);
  };

  return (
    <>
      <style>
        {`
          dialog::backdrop {
            backdrop-filter: blur(5px);
            background-color: rgba(0, 0, 0, 0.3);
          }
        `}
      </style>

      <dialog ref={dialogRef}>
        <h2>Edit Task</h2>
        <form onSubmit={handleSubmit} method="dialog">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
          /><br />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
          /><br />

          <label>Status (auto-managed):</label><br />
          <input
            name="status"
            value={formData.status}
            readOnly
            disabled
          /><br />

          <input
            name="visibility"
            value={formData.visibility}
            onChange={handleChange}
            placeholder="Visibility"
          /><br />

          <input
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Tags (comma-separated)"
          /><br />
          <input
  name="resourceLink"
  value={formData.resourceLink}
  onChange={handleChange}
  placeholder="Resource Link (optional)"
/><br />


          <div style={{ marginTop: '10px' }}>
            <button type="submit">Save</button>
            <button type="button" onClick={onClose} style={{ marginLeft: '10px' }}>Cancel</button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default EditTaskModal;
