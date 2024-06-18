import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";
import { useLoginUserMutation } from "../slices/userApiSlice";
import { saveCredentials } from "../slices/authSlice";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/projectmanagementtool");
    }
  }, [userInfo]);

  const [authenticateUser, { isLoading, error }] = useLoginUserMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const userData = await authenticateUser({ email, password }).unwrap();
      dispatch(saveCredentials({ ...userData }));
      navigate("/projectmanagementtool");
      toast.success("logged in successful");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
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
