import { useState } from 'react';
import { Container, Row, Col, Button, Card, Form, Alert } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';

const Hero = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/contact', formData);
      setSuccessMsg('Message sent successfully!');
      setErrorMsg('');
      setFormData({ name: '', email: '', message: '' });

      // Auto-hide message after 4s
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (error) {
      setErrorMsg('Failed to send message. Please try again later.');
      setSuccessMsg('');

      // Auto-hide message after 4s
      setTimeout(() => setErrorMsg(''), 4000);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="py-5 bg-light text-center">
        <Container>
          <h1 className="fw-bold mb-3">Collaborate on Tasks with Ease</h1>
          <p className="lead">
            Welcome to CMTT — your collaborative platform to create, share, and manage tasks with flexible privacy and team control.
          </p>
          <div className="mt-4">
            <LinkContainer to="/login">
              <Button variant="dark" className="me-2">Get Started</Button>
            </LinkContainer>
            <LinkContainer to="/register">
              <Button variant="outline-dark">Sign Up</Button>
            </LinkContainer>
          </div>
        </Container>
      </div>

      {/* About Us Section */}
      <div className="py-5 bg-white">
        <Container>
          <h2 className="text-center mb-4">About CMTT</h2>
          <Row className="justify-content-center">
            <Col md={8}>
              <p className="text-center">
                CMTT (Collaborative Management of Tasks Tool) empowers users to create and manage tasks that can be kept private, shared with a group, or made public. 
                Each task can include descriptions, tags (like “urgent” or “project X”), and links to external resources. 
                Built on the MERN stack, it provides secure authentication, structured task visibility, and group-based collaboration features.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <div className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">Key Features</h2>
          <Row>
            <Col md={4}>
              <Card className="p-3 shadow-sm mb-4">
                <Card.Title>🗂️ Flexible Task Visibility</Card.Title>
                <Card.Text>Create private tasks, share with groups, or make tasks public — all with one click.</Card.Text>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="p-3 shadow-sm mb-4">
                <Card.Title>🏷️ Rich Annotations</Card.Title>
                <Card.Text>Add contextual tags and links to resources like websites, documents, or images.</Card.Text>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="p-3 shadow-sm mb-4">
                <Card.Title>👥 Group Collaboration</Card.Title>
                <Card.Text>Create groups, invite users, assign shared tasks, and manage group memberships.</Card.Text>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Team Section */}
      <div className="py-5 bg-white">
        <Container>
          <h2 className="text-center mb-5">Meet the Team</h2>
          <Row className="text-center g-4">
            <Col md={4}>
              <img src="/images/Jojo.jpeg" alt="Jojo" className="rounded-circle mb-2" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
              <h5>Jojo Justine</h5>
              <p>Full Stack Developer</p>
            </Col>
            <Col md={4}>
              <img src="/images/Sourav.jpeg" alt="Sourav" className="rounded-circle mb-2" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
              <h5>Sourav Jose</h5>
              <p>Frontend Engineer</p>
            </Col>
            <Col md={4}>
              <img src="/images/Josin.jpeg" alt="Josin" className="rounded-circle mb-2" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
              <h5>Josin Michael</h5>
              <p>Backend Specialist</p>
            </Col>
            <Col md={4}>
              <img src="/images/Gopika.jpeg" alt="Gopika" className="rounded-circle mb-2" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
              <h5>Gopika Babu</h5>
              <p>UI/UX Designer</p>
            </Col>
            <Col md={4}>
              <img src="/images/Ancy.jpeg" alt="Ancy" className="rounded-circle mb-2" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
              <h5>Ancy Babu</h5>
              <p>DevOps Engineer</p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Contact Section */}
      <div className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-4">Contact Us</h2>
          <Row className="justify-content-center">
            <Col md={6}>
              {successMsg && <Alert variant="success">{successMsg}</Alert>}
              {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="contactName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="contactEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="contactMessage">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message"
                  />
                </Form.Group>
                <Button variant="dark" type="submit">Send Message</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Footer */}
      <div className="py-4 bg-dark text-light text-center">
        <Container>
          <p className="mb-0">&copy; {new Date().getFullYear()} CMTT - Collaborative Task Manager. All rights reserved.</p>
        </Container>
      </div>
    </>
  );
};

export default Hero;
