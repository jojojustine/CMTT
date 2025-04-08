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
import { useNavigate } from 'react-router-dom';
const GroupScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [code, setCode] = useState('');
  const [groupName, setGroupName] = useState('');
  // const [selectedGroup, setSelectedGroup] = useState(null);
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
        setSelectedGroup(null);
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
      <h2>Groups</h2>

      {/* Create Group Form */}
      <div className="mb-4">
        <label className="form-label">Create New Group</label>
        <div className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter group name"
          />
          <button className="btn btn-success" onClick={handleCreateGroup}>
            Create
          </button>
        </div>
      </div>

      {/* Join Group Form */}
      <div className="mb-3">
        <label htmlFor="codeInput" className="form-label">
          Join Group by Code
        </label>
        <div className="d-flex">
          <input
            type="text"
            id="codeInput"
            className="form-control me-2"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleJoin}>
            Join
          </button>
        </div>
      </div>

      {/* Group List */}
      <h4 className="mt-4">My Groups</h4>
      {groups.length === 0 ? (
        <p>You are not in any groups yet.</p>
      ) : (
        groups.map((group) => (
          <div key={group._id} className="card mb-3 p-3">
            <h5>{group.name}</h5>
            <p><strong>Owner:</strong> {group.owner.name}</p>
            <p><strong>Join Code:</strong> {group.owner._id === userInfo._id ? group.joinCode : 'Hidden'}</p>
            <button
              className="btn btn-outline-info btn-sm"
              onClick={() => navigate(`/groups/${group._id}`)}

            >
              View Group
            </button>
          </div>
        ))
      )}

      {/* Group Details Popup
      <GroupDetailsModal
        isOpen={!!selectedGroup}
        onClose={() => setSelectedGroup(null)}
        group={selectedGroup}
        userInfo={userInfo}
        onDeleteGroup={handleDeleteGroup}
        onRemoveMember={handleRemoveMember}
      /> */}
    </div>
  );
};

export default GroupScreen;
