import React, { useEffect, useState } from "react";
import { Container, Row, Col, Stack, Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useGetEmployersDataMutation } from "../slices/userApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useGetTasksQuery } from "../slices/taskApiSlice";
import { FaEdit } from "react-icons/fa";

const ProjectTraceScreen = () => {
  const { employeeId, projectId, role } = useParams();
  const [employersData, setEmployersData] = useState([]);
  const [tasks, setTasks] = useState(null);

  const { userInfo } = useSelector((state) => state.auth);

  const { projectsInfo } = useSelector((state) => state.projects);
  var openedProject;
  if (projectsInfo) {
    openedProject = projectsInfo.filter((project) => project._id === projectId);
  }

  const [getEmployersData, { isLoading }] = useGetEmployersDataMutation();
  const {
    data: fetchedTasks,
    isLoading: isQuerying,
    error,
  } = useGetTasksQuery({
    employeeId,
    projectId,
  });

  const navigate = useNavigate();

  useEffect(() => {
    setTasks(fetchedTasks);
  }, [fetchedTasks]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEmployersData([
        ...openedProject[0].teamMembers,
      ]).unwrap();

      setEmployersData(data);
    };

    fetchData();
  }, []);

  const handleEmployeeClick = (employee) => {
    if (role === "manager") {
      navigate(
        `/projectmanagementtool/${employee.role}/${employee._id}/project/${projectId}`
      );
    }
  };

  const editHandler = (task) => {
    navigate(`edittask/${task._id}`);
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col md={6}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {openedProject && (
                <>
                  <h2>{openedProject[0].title}</h2>
                  <h5 className="mt-4">Description:</h5>
                  <div
                    className="p-3 my-3 rounded shadow"
                    style={{ heigth: "auto" }}
                  >
                    {openedProject[0].description}
                  </div>
                  <h5 className="mt-4">Start Date:</h5>
                  <div>{openedProject[0].startDate.substring(0, 10)}</div>
                  <h5 className="mt-4">Deadline:</h5>
                  <div>{openedProject[0].endDate.substring(0, 10)}</div>
                </>
              )}

              {role !== "manager" && (
                <>
                  <h5 className="mt-4">Manager</h5>
                  <div>Manager</div>
                </>
              )}

              <h5 className="mt-4">Employees</h5>
              <ul className="mt-2 p-3 " style={{ width: "400px" }}>
                {employersData.map((employee) => (
                  <li
                    key={employee._id}
                    className="employee-name ps-3 rounded"
                    onClick={() => handleEmployeeClick(employee)}
                  >
                    {employee.name}
                  </li>
                ))}
              </ul>
            </>
          )}
        </Col>

        <Col md={6}>
          <h2> Project progress</h2>
          {userInfo && userInfo._id === employeeId && (
            <div
              className="btn btn-info border-success"
              style={{ float: "right" }}
            >
              <Link
                style={{ color: "black", textDecoration: "none" }}
                to="createtask"
              >
                Add a Task
              </Link>
            </div>
          )}
          <div className="mt-4 mt-5">
            {isQuerying ? (
              <Loader />
            ) : tasks && tasks.length ? (
              tasks.map((task) => (
                <Stack gap={3} key={task._id} style={{ textAlign: "center" }}>
                  <div>
                    {task.taskName}{" "}
                    <Badge
                      bg={
                        task.status === "Completed"
                          ? "success"
                          : task.status === "Pending"
                          ? "danger"
                          : "warning"
                      }
                      className="my-3"
                    >
                      {task.status}
                    </Badge>
                    <Badge
                      bg="info"
                      style={{ cursor: "pointer" }}
                      onClick={() => editHandler(task)}
                    >
                      <FaEdit />
                    </Badge>
                  </div>
                </Stack>
              ))
            ) : (
              <Message>
                Tasks that are created by you can be seen here. This will help
                in tracking your progress
              </Message>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectTraceScreen;
