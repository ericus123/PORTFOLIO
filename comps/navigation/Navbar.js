import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authRequest } from "../../redux/actions/auth/checkAuth";
import { useRouter } from "next/router";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import unknown_avatar from "../../assets/images/avatar.png";
import {
  ArrowRightCircleFill,
  ArrowLeftCircleFill,
  PersonPlusFill,
  PersonCircle,
} from "react-bootstrap-icons";
import {FaBars} from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/fontawesome-free-solid";

const Navigation = () => {
  const logout = () => {
    process.browser ? localStorage.clear() : null;
    process.browser ? window.location.reload() : null;
  };
  const router = useRouter();
  const user = useSelector((state) => state.checkAuth.user);
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
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
        
        >
          <span  ><FaBars className="menu-icon"/></span>
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
          <Nav>
            {user ? (
              <NavDropdown
                title={
                  <>
                    <div className="profile-picture">
                      <img src={user?.avatar || unknown_avatar} />
                    </div>
                  </>
                }
                id="navbarScrollingDropdown"
              >
                <NavDropdown.Item href="/profile">
                  {" "}
                  <PersonCircle />
                  &nbsp;Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => logout()}>
                  <ArrowLeftCircleFill />
                  &nbsp;Signout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link href="/login" className="login-btn">
                  <ArrowRightCircleFill />
                  &nbsp;Login
                </Nav.Link>
                <Nav.Link href="/signup" className="signup-btn">
                  <PersonPlusFill />
                  &nbsp;Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
