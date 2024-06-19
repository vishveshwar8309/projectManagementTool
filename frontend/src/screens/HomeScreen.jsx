import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import dayGridPlugin from "@fullcalendar/daygrid";
import { Calendar } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";

import { useGetProjectDetailsMutation } from "../slices/projectApiSlice";
import { saveProjects } from "../slices/projectSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";

const HomeScreen = () => {
  const [projects, setProjects] = useState([]);
  const [events, setEvents] = useState([]);

  const { userInfo } = useSelector((state) => state.auth);
  const { projectsInfo } = useSelector((state) => state.projects);

  var existingProjects;
  if (!projectsInfo) {
    existingProjects = [];
  } else {
    existingProjects = projectsInfo;
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [getProjectDetails, { isLoading, error }] =
    useGetProjectDetailsMutation();

  const calendarRef = useRef(null);

  //Loading projects data
  useEffect(() => {
    async function fetchData() {
      const projectDetailsRef = await getProjectDetails(userInfo.projects);

      if (!projectDetailsRef?.error?.data) {
        const fetchedProjects = projectDetailsRef.data;

        const updatedProjects = [
          ...existingProjects,
          ...fetchedProjects.filter(
            (newProject) =>
              !existingProjects.some(
                (existingProject) => existingProject.id === newProject.id
              )
          ),
        ];

        setProjects(updatedProjects);
        dispatch(saveProjects([...updatedProjects]));

        const updatedEvents = fetchedProjects.map((project) => ({
          projectId: project._id,
          title: project.title,
          start: project.startDate,
          end: project.endDate,
        }));

        setEvents(updatedEvents);
      } else {
        toast.info("no projects Found");
      }
    }
    fetchData();
  }, []);

  //createing the custom calender using fullCalender Api
  useEffect(() => {
    if (calendarRef.current) {
      const eventClickHandler = (clickInfo) => {
        navigate(
          `${userInfo.role === "Manager" ? "manager" : "employee"}/${
            userInfo._id
          }/project/${clickInfo.event._def.extendedProps.projectId}`
        );
      };

      const calendar = new Calendar(calendarRef.current, {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: "FourDays",

        views: {
          FourDays: {
            type: "dayGrid",
            duration: { days: 4 },
          },
        },
        eventColor: "#378006",
        events: { events },
        contentHeight: 600,
        eventClick: eventClickHandler,
        headerToolbar: {
          left: "prev,next",
          right: "FourDays,dayGridDay",
        },
      });

      calendar.render();
    }
  }, [events]);

  return (
    <Container>
      <Row>
        <Col className="mt-5">
          <h1>My Projects</h1>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <div>
              {userInfo && userInfo.role === "Manager" ? (
                <Message variant="info">
                  No Projects at present, Create a new Project and Assign them
                  to employees
                </Message>
              ) : (
                <Message variant="info">
                  No Projects at present. You can see your Projects when the
                  Manager assigns you.
                </Message>
              )}
            </div>
          ) : (
            projects && (
              <Table hover responsive className="table-sm mt-5">
                <thead>
                  <tr className="shadow" style={{ height: "50px" }}>
                    <th>Title </th>
                    <th>No. of team members</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                  </tr>
                </thead>
                <br />
                <tbody>
                  {userInfo &&
                    projects.map((project) => (
                      <>
                        <tr className="shadow" style={{ height: "40px" }}>
                          <td>
                            <Link
                              to={`/projectmanagementtool/${
                                userInfo.role === "Manager"
                                  ? "manager"
                                  : "employee"
                              }/${userInfo._id}/project/${project._id}`}
                              key={project._id}
                              style={{ textDecoration: "none", color: "black" }}
                            >
                              {project.title}
                            </Link>
                          </td>
                          <td>{project.teamMembers.length}</td>
                          <td>{project.endDate.substring(0, 10)}</td>
                          <td>{project.startDate.substring(0, 10)}</td>
                        </tr>
                        <br />
                      </>
                    ))}
                </tbody>
              </Table>
            )
          )}
        </Col>
        <Col md={4}>
          <div ref={calendarRef}></div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeScreen;
