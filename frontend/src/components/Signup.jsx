import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const { register, handleSubmit, watch,formState:{errors} } = useForm();
    const navigate=useNavigate()
  const onSubmit = data => {
    axios.post('http://localhost:5000/signup', data)
      .then(response => {
        console.log(response.data);
        navigate("/login")
      })
      .catch(error => {
        console.log('There was an error signing up!', error);
      });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          
          {...register("email",{ required: "enter your email" })}
        />
        <span className='text-danger' >{errors.email?.message}</span>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          
          {...register("password",{ required: true ,minLength:{value:4 ,message:"minimum 4 charcters"} })}
        />
        <span className='text-danger' >{errors.password?.message}</span>
        
      </Form.Group>

      <Form.Group controlId="formBasicPasswordConfirm">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          
          {...register("confirmPassword",{
            validate: value => value === watch('password')||"password does not match"
          })}
        />
        <span className='text-danger'  >{errors.confirmPassword?.message}</span>
      </Form.Group>
  
      <Button variant="primary" type="submit">
        Signup
      </Button>
    </Form>
  );
};

export default Signup;
