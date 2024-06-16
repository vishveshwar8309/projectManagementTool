import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { Link } from "react-router-dom";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <FormContainer>
      <h1 className="mt-5">Register User</h1>
      <Form className="mt-5" onSubmit={submitHandler}>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="name" className="my-3">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-4">
          <Button type="submit" className="border-success">
            Register
          </Button>
        </Form.Group>
      </Form>
      <div>
        Already had an account? <Link to="/signin">Signin</Link>
      </div>
    </FormContainer>
  );
};

export default RegisterScreen;
