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
          input, textarea, select {
            width: 100%;
            padding: 10px;
            margin-bottom: 12px;
            border-radius: 4px;
            border: 1px solid #ccc;
            font-size: 1rem;
          }
          form {
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 100%;
          }
        `}
      </style>

      <dialog
        ref={dialogRef}
        style={{
          width: '75%',
          maxWidth: '900px',
          padding: '25px',
          borderRadius: '10px'
        }}
      >
        <h2>Edit Task</h2>

        <form onSubmit={handleSubmit} method="dialog">
  <label>Title</label>
  <input
    name="title"
    value={formData.title}
    onChange={handleChange}
    placeholder="Enter task title"
  />

  <label>Description</label>
  <textarea
    name="description"
    value={formData.description}
    onChange={handleChange}
    placeholder="Enter description"
    rows={5}
  />

  <label>Status (auto-managed)</label>
  <input
    name="status"
    value={formData.status}
    readOnly
    disabled
  />

<label>Visibility</label>
<select
  name="visibility"
  value={formData.visibility}
  onChange={handleChange}
>
  <option value="private">Private</option>
  <option value="public">Public</option>
</select>

  <label>Tags (comma-separated)</label>
  <input
    name="tags"
    value={formData.tags}
    onChange={handleChange}
    placeholder="e.g. important, project X"
  />

  <label>Resource Link (optional)</label>
  <input
    name="resourceLink"
    value={formData.resourceLink}
    onChange={handleChange}
    placeholder="https://example.com/resource"
  />

  <div style={{ textAlign: 'right', marginTop: '15px' }}>
    <button type="submit">💾 Save</button>
    <button type="button" onClick={onClose} style={{ marginLeft: '10px' }}>❌ Cancel</button>
  </div>
</form>

      </dialog>
    </>
  );
};

export default EditTaskModal;
