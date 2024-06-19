import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import { useCreateTaskMutation } from "../slices/taskApiSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveCredentials } from "../slices/authSlice";

const CreateTaskScreen = () => {
  const { projectId, role, employeeId } = useParams();

  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const createdTask = await createTask({
      taskName,
      dueDate,
      status,
      projectId,
    });
    dispatch(saveCredentials({ ...createdTask.data[0] }));
    navigate(
      `/projectmanagementtool/${role}/${employeeId}/project/${projectId}`
    );
  };

  return (
    <FormContainer>
      <h1 className="my-4">Create a New Task</h1>

      <Form onSubmit={formSubmitHandler}>
        <Form.Group controlId="taskName" className="my-3">
          <Form.Label>Task Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name of the task"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="dueDate" className="my-3">
          <Form.Label>Due Date:</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter due date for the task"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="status" className="my-3">
          <Form.Label>Status:</Form.Label>
          <Form.Select onChange={(e) => setStatus(e.target.value)} required>
            <option value="">select...</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="my-3">
          <Button type="submit" variant="info">
            Create Task
          </Button>
        </Form.Group>
      </Form>
    </FormContainer>
  );
};

export default CreateTaskScreen;
