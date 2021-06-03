import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { authRequest } from "../redux/actions/auth/checkAuth";
import "semantic-ui-css/semantic.min.css";

const Navigation = () => {
  const [show, setShow] = useState(false);
  const [tab, setTab] = useState("none");

  const showDropdown = (e) => {
    setShow(!show);
  };
  const hideDropdown = (e) => {
    setShow(false);
  };

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
      localStorage.clear();
    }
  }, [error]);
  useEffect(() => {
    dispatch(authRequest(token));
  }, [token]);

  const scrolToSection = async (id) => {
    await router.push(`/home/${id}`);
    const anchor = document.querySelector(id);
    anchor.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };
  return (
    <div className="l-header">
      <Navbar collapseOnSelect expand="lg" className="nav bd-grid">
        <Navbar.Brand href="#home">
          {" "}
          <Link
            href="/"
            style={{ color: "#fd7e14", textDecoration: "none" }}
            shallow={true}
          >
            <a>Amani</a>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle
          style={{ marginBottom: "5px" }}
          aria-controls="responsive-navbar-nav"
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto nav__list">
            <Nav.Link className="nav__item">
              {" "}
              <Link
                href="/"
                className={tab === "home" ? "nav__link on" : "nav__link"}
                onClick={() => {
                  setTab("home");
                  scrolToSection("#home");
                }}
                shallow={true}
              >
                <a>Home </a>
              </Link>
            </Nav.Link>

            <Nav.Link className="nav__item ">
              {" "}
              <Link
                href="/#about"
                className={tab === "about" ? "nav__link on" : "nav__link"}
                // onClick={() => {
                //   setTab("about");
                //   scrolToSection("#about");
                // }}
                shallow={true}
              >
                <a>About </a>
              </Link>
            </Nav.Link>

            <Nav.Link className="nav__item ">
              <Link
                href="/#skills"
                className={tab === "skills" ? "nav__link on" : "nav__link"}
                // onClick={() => {
                //   setTab("skills");
                //   scrolToSection("#skills");
                // }}
                shallow={true}
              >
                <a>Skills</a>
              </Link>
            </Nav.Link>
            <Nav.Link className="nav__item ">
              <Link
                href="/#contact"
                className={tab === "contact" ? "nav__link on" : "nav__link"}
                // onClick={() => {
                //   setTab("contact");
                //   scrolToSection("#contact");
                // }}
                shallow={true}
              >
                <a>Contact</a>
              </Link>
            </Nav.Link>
            <Nav.Link className="nav__item ">
              <Link
                href="/blog"
                // onClick={() => {
                //   setTab("blog");
                // }}
                className={tab === "blog" ? "nav__link on" : "nav__link"}
              >
                <a>Blog</a>
              </Link>
            </Nav.Link>

            {!user ? (
              <Nav.Link className="nav__item">
                <Link
                  href="/login"
                  // onClick={() => {
                  //   setTab("login");
                  // }}
                  className={tab === "login" ? "" : "nav__link"}
                  shallow={true}
                >
                  <a>Log in</a>
                </Link>
              </Nav.Link>
            ) : null}
          </Nav>
          {user ? (
            <Nav className="nav__drop">
              <NavDropdown
                title={
                  <div style={{ display: "flex", flexDirection: "columns" }}>
                    <img
                      style={{
                        width: "45px",
                        borderRadius: "50%",
                        padding: "2px",
                      }}
                      className="drop-image"
                      src={user.avatar}
                    />
                  </div>
                }
                id="collasible-nav-dropdown"
                show={show}
                onMouseEnter={showDropdown}
                onMouseLeave={hideDropdown}
              >
                <NavDropdown.Item className="prof-item">
                  <Link
                    href="/profile"
                    style={{ textDecoration: "none" }}
                    shallow={true}
                  >
                    <a>
                      <span className="prof-names">
                        {user.firstName + " " + user.lastName}
                      </span>
                      <br />
                      <span
                        style={{
                          fontWeight: "300",
                          fontSize: "small",
                          color: "gray",
                        }}
                      >
                        @{user.username}
                      </span>
                    </a>
                  </Link>
                </NavDropdown.Item>

                {/* {user.role === "superAdmin" || user.role === "Admin" ? (
                  <Link style={{ textDecoration: "none" }} href="/dashboard" shallow={true}>
                  <a>
                    <NavDropdown.Item href="#action/3.2">
                      Dashboard
                    </NavDropdown.Item>
                    </a>
                  </Link>
                ) : null} */}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>Signout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav className="nav__signup">
              <Nav.Link style={{ width: "200px" }}>
                <Button style={{ borderRadius: "10%" }} variant="primary">
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    href="/signup"
                    shallow={true}
                  >
                    <a>SignUp </a>
                  </Link>
                </Button>
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
