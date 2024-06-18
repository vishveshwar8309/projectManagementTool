import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { useRegisterUserMutation } from "../slices/userApiSlice";
import { saveCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/projectmanagementtool");
    }
  }, [userInfo]);

  const [registerUser, { isLoading, error }] = useRegisterUserMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      try {
        const user = await registerUser({
          email,
          name,
          password,
          role,
        }).unwrap();
        dispatch(saveCredentials({ ...user }));
        navigate("/progectmanagementtool");
        toast.success("loggedIn successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    } else {
      toast.error("password miss match");
    }
  };

  return (
    <FormContainer>
      <h1 className="mt-5">Register User</h1>
      <Form className="mt-4" onSubmit={submitHandler}>
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

        <Form.Group controlId="role" className="my-3">
          <Form.Label>Role:</Form.Label>
          <Form.Select onChange={(e) => setRole(e.target.value)} required>
            <option value="">Choose Your Role</option>
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
          </Form.Select>
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

        <Form.Group controlId="confirmPassword" className="my-3">
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Re-enter Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
