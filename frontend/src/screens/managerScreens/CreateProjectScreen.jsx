import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import FormContainer from "../../components/FormContainer";
import { useCreateProjectMutation } from "../../slices/projectApiSlice";

const CreateProjectScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // State to hold the current input value
  const [newMembers, setNewMembers] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);

  const navigate = useNavigate();

  const [createProject, { isLoading }] = useCreateProjectMutation();

  const clickHandler = () => {
    setTeamMembers([...teamMembers, newMembers]);
    setNewMembers("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const resp = await createProject({
      title,
      description,
      teamMembers,
      startDate,
      endDate,
    }).unwrap();

    if (resp?.data?.message !== "Server error") {
      window.confirm("Restart the session to see newly added project");
      toast.success("successful");
      navigate("/projectmanagementtool");
    } else {
      toast.error(resp.message);
    }
  };

  return (
    <FormContainer>
      {isLoading && <p>loading...</p>}
      <Form onSubmit={handleFormSubmit} className="mt-5">
        <Form.Group controlId="title" className="my-2">
          <Form.Label>Project Title:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Add a title to Project"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="description" className="my-3">
          <Form.Label>Project Description:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Add a description to Project"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="members" className="my-3">
          <Form.Label>Project Members:</Form.Label>
          <Form.Control
            value={teamMembers}
            placeholder="names of team members appear here"
            required
            readOnly
          ></Form.Control>
          <Form.Control
            type="text"
            placeholder="Add team members here one by one"
            value={newMembers}
            onChange={(e) => setNewMembers(e.target.value)}
            className="my-1"
          ></Form.Control>
          <Button variant="info" onClick={clickHandler}>
            Add Member
          </Button>
        </Form.Group>

        <Form.Group controlId="startDate" className="my-3">
          <Form.Label>Start Date:</Form.Label>
          <Form.Control
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="endDate" className="my-3">
          <Form.Label>End Date:</Form.Label>
          <Form.Control
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-5">
          <Button variant="info" type="submit">
            Create Task
          </Button>
        </Form.Group>
      </Form>
    </FormContainer>
  );
};

export default CreateProjectScreen;
