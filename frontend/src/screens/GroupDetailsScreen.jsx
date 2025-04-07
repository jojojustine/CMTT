import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Card, ListGroup, Spinner } from 'react-bootstrap';

const GroupDetailsScreen = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await fetch(`/api/groups/${groupId}/details`);
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
              <strong>{task.title}</strong> — {task.status}
              <br />
              {task.description}
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
