import { Navbar, Nav, Container,NavDropdown,Badge} from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useLogoutMutation } from '../slices/usersApiSlice';
import {logout} from '../slices/authSlice'
const Header = () => {
  const {userInfo} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
<Navbar.Brand>
  <img
    src="/images/logo.png"
    alt="Syncify Logo"
    height="40"
    width="80"
    className="d-inline-block align-top"
  />
</Navbar.Brand>

          </LinkContainer>
        
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/tasks'>
                      <NavDropdown.Item>Tasks</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item as={Link} to='/groups'>Groups</NavDropdown.Item>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>

              ):(
                <>
                <LinkContainer to='/login'>
                <Nav.Link >
                      <FaSignInAlt /> Sign In
                </Nav.Link>
              </LinkContainer>
               <LinkContainer to='/register'>
               <Nav.Link >
                      <FaSignOutAlt /> Sign Up
                </Nav.Link>
               </LinkContainer>  
                </>

              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;