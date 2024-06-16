import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { Link } from "react-router-dom";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <FormContainer>
      <h1 className="mt-5">User Login</h1>
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

        <Form.Group className="my-3">
          <Button type="submit" className="border-success">
            Signin
          </Button>
        </Form.Group>
      </Form>
      <div>
        didn't have an account? <Link to="/register">register</Link>
      </div>
    </FormContainer>
  );
};

export default LoginScreen;
