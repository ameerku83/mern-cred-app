import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Signup from './components/Signup';
import Login from './components/Login';


import Names from './components/Names';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import UserEditForm from './components/UserEditForm';

function App() {
  return (
    
    <Router>
      
      <Container>
        <Routes>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          

          <Route path="/" element={<UserList />} />
      <Route path="/add" element={<UserForm />} />
      <Route path="/edit/:id" element={<UserEditForm />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
