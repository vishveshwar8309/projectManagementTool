import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary navbarBackground">
      <Container>
        <Navbar.Brand>Project Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/signin">
              <Nav.Link>
                <FaUser />
                SignIn
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
