import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Stack, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
// import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Calendar } from "@fullcalendar/core";
// import timeGridPlugin from "@fullcalendar/timegrid";
import { useGetProjectDetailsMutation } from "../slices/projectApiSlice";
import { toast } from "react-toastify";
import Message from "../components/Message";
import { saveProjects } from "../slices/projectSlice";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  const [projects, setProjects] = useState([]);
  const [events, setEvents] = useState([]);
  var existingProjects;

  const { userInfo } = useSelector((state) => state.auth);
  const { projectsInfo } = useSelector((state) => state.projects);
  console.log(projectsInfo);

  if (!projectsInfo) {
    existingProjects = [];
  } else {
    existingProjects = projectsInfo;
  }

  console.log(existingProjects);

  const dispatch = useDispatch();

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
          title: project.title,
          start: project.startDate,
          end: project.endDate,
        }));
        console.log(updatedEvents);

        setEvents(updatedEvents);
      } else {
        toast.info(projectDetailsRef.error.data);
      }
    }
    fetchData();
  }, []);

  //createing the custom calender using fullCalender Api
  if (calendarRef.current) {
    const calendar = new Calendar(calendarRef.current, {
      plugins: [dayGridPlugin],
      initialView: "FourDays",

      views: {
        FourDays: {
          type: "dayGrid",
          duration: { days: 4 },
        },
      },

      headerToolbar: {
        left: "prev,next",
        right: "FourDays,dayGridDay",
      },

      // plugins: [dayGridPlugin],
      // initialView: "dayGridWeek",
      // headerToolbar: {
      //   left: "prev,next",
      //   center: "title",
      //   right: "dayGridWeek,dayGridDay", // user can switch between the two
      // },

      eventColor: "#378006",
      events: { events },
      contentHeight: 600,
    });

    calendar.render();
  }

  return (
    <Container>
      <Row>
        <Col className="mt-5">
          <h1>My Projects</h1>
          {isLoading ? (
            <p>Loading...</p>
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
                    <th>Start Date</th>
                    <th>End Date</th>
                  </tr>
                </thead>
                <br />
                <tbody>
                  {projects.map((project) => (
                    <>
                      <tr className="shadow" style={{ height: "40px" }}>
                        <td>
                          <Link
                            to={`/projectmanagementtool/project/${project._id}`}
                            key={project._id}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            {project.title}
                          </Link>
                        </td>
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
