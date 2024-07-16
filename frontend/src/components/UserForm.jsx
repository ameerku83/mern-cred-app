import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

const UserForm = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = data => {
    axios.post('http://localhost:5000/users', data)
      .then(() => navigate('/'))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Add User</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                {...register('name')} placeholder="Name" 
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Age</Form.Label>
              <Form.Control
                
                {...register('age')} placeholder="Age" type="number"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control as="textarea"
                
               {...register('address')} placeholder="Address"
              />
            </Form.Group>
            
        <Button type="submit" className=' primery mt-2'>Submit</Button>
      </Form>
    </div>
  );
};

export default UserForm;
