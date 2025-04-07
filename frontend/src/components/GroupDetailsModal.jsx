import React, { useEffect, useRef } from 'react';

const GroupDetailsModal = ({
  isOpen,
  onClose,
  group,
  userInfo,
  onDeleteGroup,
  onRemoveMember
}) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (!isOpen && dialogRef.current?.open) {
      dialogRef.current.close();
    }
  }, [isOpen]);

  if (!group) return null;

  return (
    <>
      <style>
        {`
          dialog::backdrop {
            backdrop-filter: blur(4px);
            background: rgba(0,0,0,0.3);
          }
        `}
      </style>
      <dialog ref={dialogRef} style={{ width: '60%', padding: '20px', borderRadius: '12px' }}>
        <h3>{group.name}</h3>
        <p><strong>Owner:</strong> {group.owner.name}</p>
        <p><strong>Group ID:</strong> {group._id}</p>

        <p><strong>Members:</strong></p>
        <ul>
          {group.members.map((m) => (
            <li key={m._id} className="d-flex justify-content-between align-items-center">
              <span>{m.name}</span>
              {group.owner._id === userInfo._id && m._id !== userInfo._id && (
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onRemoveMember(group._id, m._id)}
                >
                  Remove
                </button>
              )}
            </li>
          ))}
        </ul>

        {group.owner._id === userInfo._id && (
          <button
            className="btn btn-outline-danger btn-sm mt-3"
            onClick={() => onDeleteGroup(group._id)}
          >
            Delete Group
          </button>
        )}

        <div className="mt-4 text-end">
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </dialog>
    </>
  );
};

export default GroupDetailsModal;
