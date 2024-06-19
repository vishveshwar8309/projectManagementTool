import React from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logoutUser } from "../slices/authSlice";
import { useLogoutUserMutation } from "../slices/userApiSlice";
import { removeProjects } from "../slices/projectSlice";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logout] = useLogoutUserMutation();

  const handleLogOut = async () => {
    await logout();
    dispatch(logoutUser());
    dispatch(removeProjects());
    navigate("/signin");
    toast.success("logout successfull");
  };

  return (
    <Navbar expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand className="me-5">Project Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {userInfo && userInfo.role === "Manager" && (
              <>
                <LinkContainer
                  to={`/projectmanagementtool/manager/${userInfo._id}/createproject`}
                  className="me-5"
                >
                  <Nav.Link>Create new project</Nav.Link>
                </LinkContainer>
              </>
            )}
            {userInfo ? (
              <>
                <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={handleLogOut}>
                    logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <LinkContainer to="/signin">
                <Nav.Link>
                  <FaUser />
                  SignIn
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
