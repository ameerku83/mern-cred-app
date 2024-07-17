import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button,Row, Table } from 'react-bootstrap';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {   
    axios.get('https://mern-cred-backend.onrender.com/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  const deleteUser = id => {
    axios.delete(`https://mern-cred-backend.onrender.com/users/${id}`)
      .then(() => setUsers(users.filter(user => user._id !== id)))
      .catch(error => console.error(error));
  };

  return (
    
    <Row className='mx-2'>
      <h1>User List</h1>
      <Link to="/add">Add User</Link>
    
  
      <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Address</th>
                <th>Actions</th>
                
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>  {user.address}</td>
                
                  <td>
                    <Button > <Link to={`/edit/${user._id}`} style={{color:'white',textDecoration:"none"}} >Edit</Link></Button> <br />
                    <Button className='mt-1' variant="danger" onClick={() => deleteUser(user._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          </Row>
          

      


      
  
  );
};

export default UserList;
