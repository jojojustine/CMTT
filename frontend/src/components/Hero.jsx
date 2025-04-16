import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Form, Alert } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaUsers, FaTags, FaEye, FaLinkedin, FaCheckCircle, FaUserPlus, FaSyncAlt } from 'react-icons/fa';
import { FiMail, FiUser, FiMessageSquare } from 'react-icons/fi';

const Hero = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (error) {
      setErrorMsg('Failed to send message. Please try again later.');
      setSuccessMsg('');
      setTimeout(() => setErrorMsg(''), 4000);
    }
  };

  const teamMembers = [
    {
      name: 'Jojo Justine',
      role: 'Full Stack Developer',
      img: '/images/Jojo.jpeg',
      linkedin: 'https://www.linkedin.com/in/jojo-justine-68963b86/'
    },
    {
      name: 'Sourav Jose',
      role: 'Full Stack Developer',
      img: '/images/Sourav.jpeg',
      linkedin: 'https://www.linkedin.com/in/sourav-jose-415238336/'
    },
    {
      name: 'Josin Michael',
      role: 'Full Stack Developer',
      img: '/images/Josin.jpeg',
      linkedin: 'https://www.linkedin.com/in/josinmichael7034/'
    },
    {
      name: 'Gopika Babu',
      role: 'Full Stack Developer',
      img: '/images/Gopika.jpeg',
      linkedin: 'https://www.linkedin.com/in/gopikababu817/'
    },
    {
      name: 'Ancy Babu',
      role: 'Full Stack Developer',
      img: '/images/Ancy.jpeg',
      linkedin: 'https://www.linkedin.com/in/ancy-kiriyan/'
    }
  ];

  const features = [
    {
      icon: <FaEye size={28} />,
      title: 'Flexible Task Visibility',
      description: 'Create tasks with customizable visibility - keep them private, share with specific groups, or make them public for anyone to view.'
    },
    {
      icon: <FaTags size={28} />,
      title: 'Rich Task Annotations',
      description: 'Enhance tasks with descriptions, resource links, and tags for better organization and context.'
    },
    {
      icon: <FaCheckCircle size={28} />,
      title: 'Task Completion',
      description: 'Easily mark tasks as completed and track your progress across all your projects.'
    },
    {
      icon: <FaUsers size={28} />,
      title: 'Group Management',
      description: 'Create and own groups, invite members, and control access to shared tasks.'
    },
    {
      icon: <FaUserPlus size={28} />,
      title: 'Member Management',
      description: 'As a group owner, invite or remove members to maintain your collaborative workspace.'
    },
    {
      icon: <FaSyncAlt size={28} />,
      title: 'Real-time Updates',
      description: 'See changes instantly as team members update tasks, ensuring everyone stays on the same page.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="py-5 position-relative overflow-hidden" 
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #ff758c 100%)'
        }}>
        <div className="position-absolute top-0 start-0 w-100 h-100" 
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 30%)'
          }}></div>
        <Container className="position-relative py-5">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white text-center"
          >
            <h1 className="fw-bold mb-4 display-4" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
              Collaborative Task Management Made Simple
            </h1>
            
            <p className="lead mb-5 fs-3" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
              SYNCIFY helps teams and individuals organize, share, and complete tasks with flexible privacy controls and powerful collaboration features.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <LinkContainer to="/login">
                <Button 
                  variant="light" 
                  size="lg" 
                  className="px-4 py-3 rounded-pill shadow fw-bold"
                  style={{
                    background: 'white',
                    color: '#764ba2',
                    border: 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Get Started
                </Button>
              </LinkContainer>
              <LinkContainer to="/register">
                <Button 
                  variant="outline-light" 
                  size="lg" 
                  className="px-4 py-3 rounded-pill shadow-sm fw-bold"
                  style={{
                    borderWidth: '2px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Sign Up
                </Button>
              </LinkContainer>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* About Us Section */}
      <section className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="fw-bold mb-4 display-5">
              About <span style={{ 
                background: 'linear-gradient(90deg, #667eea, #764ba2, #ff758c)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>SYNCIFY</span>
            </h2>
            <Row className="justify-content-center">
              <Col md={10} lg={8}>
                <p className="lead mb-4" style={{ color: '#495057' }}>
                  SYNCIFY is designed to streamline task management with powerful collaboration features. 
                  Create tasks with titles, descriptions, and resource links, then choose who can access them - keep them private, 
                  share with specific groups, or make them public.
                  <p></p>
                  Our platform also enables you to create and manage groups, inviting team members to collaborate on shared tasks while 
                  maintaining complete control over your workspace.
                </p>
              </Col>
            </Row>
          </motion.div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5" style={{ 
        background: 'linear-gradient(145deg, #ffffff, #f8f9fa)'
      }}>
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-center fw-bold mb-5 display-5">
              Powerful <span style={{
                background: 'linear-gradient(90deg, #667eea, #764ba2, #ff758c)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Features</span>
            </h2>
            <Row className="g-4">
              {features.map((feature, index) => (
                <Col lg={4} md={6} key={index}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="h-100 border-0 rounded-4 overflow-hidden" style={{
                      background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
                      boxShadow: '0 10px 30px rgba(102, 126, 234, 0.1)',
                      transition: 'all 0.3s ease'
                    }}>
                      <Card.Body className="p-4 text-center">
                        <div className="mb-4" style={{
                          width: '70px',
                          height: '70px',
                          margin: '0 auto',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                          color: '#667eea'
                        }}>
                          {feature.icon}
                        </div>
                        <Card.Title className="fw-bold mb-3 fs-4" style={{ color: '#343a40' }}>
                          {feature.title}
                        </Card.Title>
                        <Card.Text style={{ color: '#6c757d' }}>{feature.description}</Card.Text>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-center fw-bold mb-5 display-5">
              Our <span style={{
                background: 'linear-gradient(90deg, #667eea, #764ba2, #ff758c)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Team</span>
            </h2>
            <Row className="g-4 justify-content-center">
              {teamMembers.map((member, index) => (
                <Col xl={2} lg={3} md={4} sm={6} key={index}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="h-100 border-0 text-center p-3" style={{
                      background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                      borderRadius: '1rem'
                    }}>
                      <div className="position-relative mx-auto mb-3" style={{ width: '140px', height: '140px' }}>
                        <img 
                          src={member.img} 
                          alt={member.name} 
                          className="rounded-circle w-100 h-100 object-cover shadow"
                          style={{
                            border: '3px solid #fff',
                            boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                          }}
                        />
                      </div>
                      <Card.Body className="p-0">
                        <Card.Title className="fw-bold mb-1 fs-5" style={{ color: '#343a40' }}>
                          {member.name}
                        </Card.Title>
                        <Card.Text className="small mb-3" style={{ color: '#6c757d' }}>
                          {member.role}
                        </Card.Text>
                        <div className="d-flex justify-content-center">
                          <a 
                            href={member.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ color: '#0a66c2' }}
                          >
                            <FaLinkedin size={20} />
                          </a>
                        </div>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="py-5 position-relative overflow-hidden" 
        style={{
          background: 'linear-gradient(135deg, #ff758c 0%, #764ba2 50%, #667eea 100%)'
        }}>
        <div className="position-absolute top-0 start-0 w-100 h-100" 
          style={{
            backgroundImage: 'radial-gradient(circle at 80% 70%, rgba(255,255,255,0.1) 0%, transparent 30%)'
          }}></div>
        <Container className="position-relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-center fw-bold mb-5 display-5 text-white">
              Contact <span style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>Us</span>
            </h2>
            <Row className="justify-content-center">
              <Col lg={6} md={8}>
                <Card className="border-0 rounded-4 overflow-hidden shadow-lg" 
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)'
                  }}>
                  <Card.Body className="p-4">
                    {successMsg && (
                      <Alert variant="success" className="rounded-3">
                        {successMsg}
                      </Alert>
                    )}
                    {errorMsg && (
                      <Alert variant="danger" className="rounded-3">
                        {errorMsg}
                      </Alert>
                    )}
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-4">
                        <Form.Label className="fw-bold d-flex align-items-center gap-2" style={{ color: '#495057' }}>
                          <FiUser className="fs-5" /> Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                          className="py-3 rounded-3 shadow-sm"
                          style={{
                            border: '1px solid rgba(0,0,0,0.1)',
                            backgroundColor: 'rgba(255,255,255,0.8)'
                          }}
                          required
                        />
                      </Form.Group>
                      <Form.Group className="mb-4">
                        <Form.Label className="fw-bold d-flex align-items-center gap-2" style={{ color: '#495057' }}>
                          <FiMail className="fs-5" /> Email
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          className="py-3 rounded-3 shadow-sm"
                          style={{
                            border: '1px solid rgba(0,0,0,0.1)',
                            backgroundColor: 'rgba(255,255,255,0.8)'
                          }}
                          required
                        />
                      </Form.Group>
                      <Form.Group className="mb-4">
                        <Form.Label className="fw-bold d-flex align-items-center gap-2" style={{ color: '#495057' }}>
                          <FiMessageSquare className="fs-5" /> Message
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          name="message"
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Your message"
                          className="py-3 rounded-3 shadow-sm"
                          style={{
                            border: '1px solid rgba(0,0,0,0.1)',
                            backgroundColor: 'rgba(255,255,255,0.8)'
                          }}
                          required
                        />
                      </Form.Group>
                      <div className="text-center mt-4">
                        <Button 
                          type="submit" 
                          className="px-5 py-3 rounded-pill shadow fw-bold d-inline-flex align-items-center gap-2 border-0"
                          style={{
                            background: 'linear-gradient(90deg, #667eea, #764ba2)',
                            color: 'white',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          <FaPaperPlane /> Send Message
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </motion.div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="py-4" style={{ 
        backgroundColor: '#343a40',
        color: 'rgba(255,255,255,0.7)'
      }}>
        <Container>
          <div className="text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} SYNCIFY - Collaborative Task Manager. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    </motion.div>
  );
};

export default Hero;