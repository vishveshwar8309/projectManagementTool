import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";
import {
  useGetATaskQuery,
  useUpdateTaskMutation,
} from "../slices/taskApiSlice";
import Loader from "../components/Loader";

const EditTaskScreen = () => {
  const { taskId, projectId, role, employeeId } = useParams();

  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const { data, isLoading, error } = useGetATaskQuery({ taskId });
  const [updatedTask] = useUpdateTaskMutation();

  useEffect(() => {
    if (data) {
      setTaskName(data.taskName);
      setDueDate(data.dueDate.substring(0, 10));
      setStatus(data.status);
    }
  }, [data]);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const resp = await updatedTask({ taskId, taskName, dueDate, status });
    if (resp) {
      toast.success("Task Updated");
      navigate(
        `/projectmanagementtool/${role}/${employeeId}/project/${projectId}`
      );
    }
  };

  return (
    <FormContainer>
      <h1 className="my-4">Edit Task</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <>
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
              <Form.Select
                onChange={(e) => setStatus(e.target.value)}
                value={status}
                required
              >
                <option value="">select...</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="my-3">
              <Button type="submit" variant="info">
                Update Task
              </Button>
            </Form.Group>
          </Form>
        </>
      )}
    </FormContainer>
  );
};

export default EditTaskScreen;
