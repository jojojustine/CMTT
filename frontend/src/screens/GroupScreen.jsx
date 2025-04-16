import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  useJoinGroupMutation,
  useGetMyGroupsQuery,
  useCreateGroupMutation,
  useDeleteGroupMutation,
  useRemoveGroupMemberMutation
} from '../slices/usersApiSlice';
import GroupDetailsModal from '../components/GroupDetailsModal';
import { FaUser, FaEnvelope, FaLock, FaEye, FaCheckCircle, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from '../GroupScreen.module.css';

const GroupScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [code, setCode] = useState('');
  const [groupName, setGroupName] = useState('');
  const navigate = useNavigate();

  const { data: groups = [], refetch } = useGetMyGroupsQuery();
  const [createGroup] = useCreateGroupMutation();
  const [joinGroup] = useJoinGroupMutation();
  const [deleteGroup] = useDeleteGroupMutation();
  const [removeGroupMember] = useRemoveGroupMemberMutation();

  const handleCreateGroup = async () => {
    try {
      await createGroup({ name: groupName }).unwrap();
      alert('Group created!');
      setGroupName('');
      refetch();
    } catch (err) {
      alert('Failed to create group');
    }
  };

  const handleJoin = async () => {
    try {
      await joinGroup({ code }).unwrap();
      alert('Joined successfully!');
      setCode('');
      refetch();
    } catch (err) {
      alert('Invalid or expired join code.');
    }
  };

  const handleDeleteGroup = async (groupId) => {
    if (window.confirm('Are you sure you want to delete this group?')) {
      try {
        await deleteGroup(groupId).unwrap();
        refetch();
      } catch (err) {
        alert('Failed to delete group');
      }
    }
  };

  const handleRemoveMember = async (groupId, userId) => {
    if (window.confirm('Remove this member from the group?')) {
      try {
        await removeGroupMember({ groupId, userId }).unwrap();
        refetch();
      } catch (err) {
        alert('Failed to remove member');
      }
    }
  };

  return (
    <div className="container mt-4">
      {/* Updated Groups Heading with Icon and Spacing */}
      

      
      <div className={styles.wrapper}>
  <div className={styles.container}>
    <h2 className={styles.heading}>
      <FaUsers className={styles.icon} />
      Groups
    </h2>

    <label className={styles.label}>Create New Group</label>
    <div className="d-flex">
      <input
        className={styles.input}
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="Enter group name"
      />
      <button className={`${styles.button} ${styles.success}`} onClick={handleCreateGroup}>
        Create
      </button>
    </div>

    <label className={styles.label}>Join Group by Code</label>
    <div className="d-flex">
      <input
        className={styles.input}
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button className={`${styles.button} ${styles.primary}`} onClick={handleJoin}>
        Join
      </button>
    </div>

    <h4 className="mt-4">My Groups</h4>
    {groups.length === 0 ? (
  <p>You are not in any groups yet.</p>
) : (
  groups.map((group) => (
    <div key={group._id} className={styles.groupCard}>
      <h5>{group.name}</h5>
      <p><strong>Owner:</strong> {group.owner.name}</p>
      <p><strong>Join Code:</strong> {group.owner._id === userInfo._id ? group.joinCode : 'Hidden'}</p>
      <div className="d-flex gap-2">
        <button
          className="btn btn-outline-info btn-sm"
          onClick={() => navigate(`/groups/${group._id}`)}
        >
          View Group
        </button>

        {group.owner._id === userInfo._id && (
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => handleDeleteGroup(group._id)}
          >
            Delete Group
          </button>
        )}
      </div>
    </div>
      ))
    )}
  </div>
</div>

    </div>
  );
};

export default GroupScreen;
