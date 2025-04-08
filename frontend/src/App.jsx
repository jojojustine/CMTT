import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className="app-wrapper">
      <Header />
      <ToastContainer />
      <Container className='my-2'>
        <Outlet />
      </Container>
    </div>
  );
};

export default App;
