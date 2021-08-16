import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { ArrowRightCircleFill, PersonPlusFill } from "react-bootstrap-icons";

const Navigation = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className="nav-bar">
      <Container style={{ color: "white" }}>
        <Navbar.Brand href="/#home" className="logo-name">
          AMANI Eric
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="navbar-toogler"
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto nav">
            <Nav.Link href="/" className="link">
              Home
            </Nav.Link>
            <Nav.Link href="/#about" className="link">
              About
            </Nav.Link>
            <Nav.Link href="/#skills" className="link">
              Skills
            </Nav.Link>
            <Nav.Link href="/#services" className="link">
              Services
            </Nav.Link>
            <Nav.Link href="/#contact" className="link">
              Contact
            </Nav.Link>
            <Nav.Link href="/blog" className="link">
              Blog
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/login" className="login-btn">
              <ArrowRightCircleFill />
              &nbsp;Login
            </Nav.Link>
            <Nav.Link href="/signup" className="signup-btn">
              <PersonPlusFill />
              &nbsp;Register
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
