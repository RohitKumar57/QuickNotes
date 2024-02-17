import { Form, Nav, Navbar, Container } from "react-bootstrap";
import React from "react";
import {  useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    // Check if "userInfo" exists in local storage
    if (localStorage.getItem("userInfo")) {
      localStorage.removeItem("userInfo");
      navigate("/");
    } else {
      // If "userInfo" doesn't exist, redirect to the login page
      navigate("/login");
    }
  };
  return (
    <Navbar
      expand="lg"
      bg="primary"
      variant="dark"
      data-bs-theme="dark"
      className="bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand href="/">QuickNotes📝</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="m-auto">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
            </Form>
          </Nav>
          <Nav
            className="my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/mynotes">My Notes</Nav.Link>
            <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
            {/* <NavDropdown title="Rohit Kumar" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">My Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
