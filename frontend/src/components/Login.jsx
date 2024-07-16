import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { register, handleSubmit} = useForm();
    const navigate= useNavigate()
  const onSubmit = data => {
    axios.post('http://localhost:5000/login', data)
      .then(response => {
        console.log(response.data);
        navigate("/")
      })
      .catch(error => {
        console.log('There was an error login!', error);
        alert(error.response.data)
      });
  };
   
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group >
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          
          {...register("email",{ required: true })}
        />
        
      </Form.Group>

      <Form.Group >
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          
          {...register("password",{ required: true })}
        />
        
      </Form.Group>

    

      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
};

export default Login;
