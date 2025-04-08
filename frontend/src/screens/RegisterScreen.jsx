import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useRegisterMutation } from '../slices/usersApiSlice';
import {setCredentials} from '../slices/authSlice';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {userInfo} = useSelector((state) => state.auth);
    const[register, {isLoading}]= useRegisterMutation();
    useEffect(() => {
        if (userInfo) {
            console.log('User already logged in. Navigating to /tasks...');
            navigate('/tasks', { replace: true });
            window.location.href = '/tasks'; 

        }
      }, [userInfo]);
    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
          } else {
            try {
              const res = await register({ name, email, password }).unwrap();
              dispatch(setCredentials({ ...res }));
            //   console.log("Registered successfully, navigating to /tasks...");
            //   navigate('/tasks', { replace: true });
            } catch (err) {
              toast.error(err?.data?.message || err.error);
            }
          }
      };
    
    return(
        <FormContainer>
            <h1>Sign Up</h1>
            
            <Form onSubmit={submitHandler}>
            <Form.Group className='my-2' controlId='name'>
            <Form.Label className="form-label">
  <FaUser /> Name
</Form.Label>

                <Form.Control
                    type='text'
                    placeholder='Enter Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                ></Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='email'>
                <Form.Label className="form-label">
  <FaEnvelope /> Email Address
</Form.Label>

                <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='password'>
                <Form.Label className="form-label">
  <FaLock /> Password
</Form.Label>

                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                { isLoading && <Loader />}
                <Button
                    type='submit'
                    variant='primary'
                    className='mt-3'
             e   >
                Sign Up
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Already have an account? <Link to='/login'>Login</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}
export default RegisterScreen;