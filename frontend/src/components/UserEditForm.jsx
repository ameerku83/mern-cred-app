import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';
const UserEditForm = () => {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/users/${id}`)
      .then(response => {
        setUser(response.data);
        setValue('name', response.data.name);
        setValue('age', response.data.age);
        setValue('address', response.data.address);
      })
      .catch(error => console.error(error));
  }, [id, setValue]);

  const onSubmit = data => {
    axios.put(`http://localhost:5000/users/${id}`, data)
      .then(() => navigate('/'))
      .catch(error => console.error(error));
  };

  return (
    user && (
      <div>
        <h1>Edit User</h1>
        <Container>
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
              <Form.Control as="textarea" rows={3}
                
               {...register('address')} placeholder="Address"
              />
            </Form.Group>
        <Button type="submit" className=' primery mt-2'>Submit</Button>
      </Form>
      </Container>
      </div>
    )
  );
};

export default UserEditForm;
