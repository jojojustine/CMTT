import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Card, ListGroup, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {
    useCompleteTaskMutation,
    useDeleteTaskMutation,
  } from '../slices/usersApiSlice';
  import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
const GroupDetailsScreen = () => {
  const { groupId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const [group, setGroup] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completeTask] = useCompleteTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  useEffect(() => {
    console.log("Received groupId from URL:", groupId);
    const fetchGroupDetails = async () => {
      try {
        const response = await fetch(`/api/users/groups/${groupId}/details`);
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setGroup(data.group);
        setTasks(data.tasks);
      } catch (error) {
        console.error('Failed to fetch group details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroupDetails();
  }, [groupId]);
  const handleMarkComplete = async (taskId) => {
    try {
      const res = await fetch(`/api/users/tasks/${taskId}/complete`, {
        method: 'PUT',
        credentials: 'include',
      });
  
      if (!res.ok) throw new Error('Failed to mark complete');
      const updated = await res.json();
      console.log('✅ Updated Task:', updated);
  
      // Replace old task with updated task
      setTasks(prev => prev.map(t => t._id === taskId ? updated : t));
    } catch (err) {
      console.error(err);
      alert('Could not mark complete');
    }
  };  
  
  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId).unwrap();
      setTasks(prev => prev.filter(t => t._id !== taskId));
    } catch (err) {
      console.error(err);
      alert('Could not delete task');
    }
  };
  
  if (loading) return <Spinner animation="border" />;
  if (!group) return <h4>Group not found</h4>;

  return (
    <div>
      <h2>Group: {group.name}</h2>
      <p>Owner: {group.owner?.name}</p>

      <Card className='mb-4'>
        <Card.Header>Members</Card.Header>
        <ListGroup>
          {group.members.map(member => (
            <ListGroup.Item key={member._id}>{member.name} ({member.email})</ListGroup.Item>
          ))}
        </ListGroup>
      </Card>

      <h3>Tasks in this group</h3>
{tasks.length > 0 ? (
  <ListGroup>
    {tasks.map(task => (
      <ListGroup.Item key={task._id}>
        <div className="d-flex justify-content-between align-items-start">
        <div>
  <strong>{task.title}</strong> — {task.status}
  <br />
  {task.description}

  {/* ✅ Show Resource Link */}
  {task.resourceLink ? (
    <div className="mt-2">
      <strong>Resource:</strong>{' '}
      <a href={task.resourceLink} target="_blank" rel="noopener noreferrer">
        {task.resourceLink}
      </a>
    </div>
  ) : (
    <div className="mt-2 text-muted"><strong>Resource:</strong> None</div>
  )}

  {/* ✅ Show Tags or fallback text */}
  <div className="mt-2">
  <strong>Tags:</strong>{' '}
  {Array.isArray(task.tags) && task.tags.length > 0 ? (
    task.tags.map((tag, index) => (
      <span key={index} className="badge bg-secondary me-1">
        {tag}
      </span>
    ))
  ) : (
    <span className="text-muted">None</span>
  )}
  </div>
</div>



          {/* ✅ Show actions only for group owner */}
          {group.owner._id === userInfo._id && task.status !== 'Completed' && (
  <div>
    <button
      className="btn btn-sm btn-success me-2"
      onClick={() => handleMarkComplete(task._id)}
    >
      Mark Complete
    </button>
    <button
      className="btn btn-sm btn-danger"
      onClick={() => handleDeleteTask(task._id)}
    >
      Delete
    </button>
  </div>
)}

        </div>
      </ListGroup.Item>
    ))}
  </ListGroup>
) : (
  <p>No tasks found for this group.</p>
)}

    </div>
  );
};

export default GroupDetailsScreen;
