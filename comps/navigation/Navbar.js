import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authRequest } from "../../redux/actions/auth/checkAuth";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import NavAuthLinks from "./NavAuthLinks";

const Navigation = () => {
  const error = useSelector((state) => state.checkAuth.error);

  const dispatch = useDispatch();
  const token = process.browser ? localStorage.getItem("auth-token") : null;
  useEffect(() => {
    if (error == "Invalid Token") {
      process.browser ? localStorage.clear() : null;
    }
  }, [error]);
  useEffect(() => {
    dispatch(authRequest(token));
  }, [token]);
  return (
    <Navbar fixed="top" collapseOnSelect expand="lg" className="nav-bar">
      <Container style={{ color: "white" }}>
        <Navbar.Brand href="/#home" className="logo-name">
          AMANI Eric
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav">
          <span>
            <FaBars className="menu-icon" />
          </span>
        </Navbar.Toggle>

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
          <NavAuthLinks />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
