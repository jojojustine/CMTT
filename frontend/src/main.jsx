import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';  // Import PrivateRoute
import HomeScreen from './screens/HomeScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import TaskScreen from './screens/TaskScreen.jsx';
import GroupScreen from './screens/GroupScreen.jsx';
import TaskForm from './components/TaskForm.jsx';  // TaskForm component
import TaskList from './components/TaskList.jsx';  // TaskList component

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public Routes */}
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />  {/* Login route */}
      <Route path="/register" element={<RegisterScreen />} />  {/* Register route */}
      
      {/* Private Routes - Only accessible if user is logged in */}
      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />  {/* Profile route */}
        <Route path='/tasks' element={<TaskScreen />} /> 
        <Route path="/groups" element={<GroupScreen />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
