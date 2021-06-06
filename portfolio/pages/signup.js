import React from "react";
import { Spinner, Col, Alert, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { signupRequest } from "../redux/actions/auth/signup";
import { authRedirect } from "../utils/redirects";
import Link from "next/link";
import { useRouter } from "next/router";

const Signup = () => {
  const error = useSelector((state) => state.signup.error);
  const message = useSelector((state) => state.signup.message);
  const isLoading = useSelector((state) => state.signup.isLoading);

  const dispatch = useDispatch();
  const router = useRouter();
  authRedirect();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      FirstName: e.target.first_name.value,
      LastName: e.target.last_name.value,
      Email: e.target.email.value,
      Password: e.target.password.value,
      ConfPassword: e.target.confPassword.value,
      Username: e.target.username.value,
    };
    dispatch(signupRequest(formData));
  };
  if (message) {
    setTimeout(() => {
      document.querySelector(".contact__form").reset();
      router.push("/login");
    }, 5000);
  }
  return (
    <div className="signup">
      <h2 className="section-title">Signup</h2>
      <div className="contact__container bd-grid ">
        <form className="contact__form" onSubmit={handleSubmit}>
          <Row>
            <Col>
              <input
                type="text"
                placeholder="First Name"
                name="first_name"
                className="signup__input"
              />

              <input
                type="text"
                placeholder="Username"
                name="username"
                className="signup__input"
              />

              <input
                type="password"
                placeholder="Password"
                name="password"
                className="signup__input"
              />
              <div>
                <p style={{ textAlign: "center", fontSize: "smaller" }}>
                  Already have an account?{" "}
                  <Link href="/login" shallow={true}>
                    <a style={{ textDecoration: "none" }}>SignIn</a>
                  </Link>
                </p>
              </div>
            </Col>
            <Col>
              <input
                type="text"
                placeholder="Last Name"
                name="last_name"
                className="signup__input"
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="signup__input"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                name="confPassword"
                className="signup__input"
              />
              {isLoading ? (
                <div style={{ textAlign: "center" }}>
                  <Spinner animation="border" size="md" role="status"></Spinner>
                </div>
              ) : (
                <button type="submit" className="signup__button">
                  Signup
                </button>
              )}
            </Col>
          </Row>
          <br />
          {error ? (
            <Alert
              variant="danger"
              style={{ fontSize: "small", textAlign: "center" }}
            >
              {error}
            </Alert>
          ) : null}
          {message ? (
            <Alert
              variant="success"
              style={{ fontSize: "small", textAlign: "center" }}
            >
              {message}
            </Alert>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default Signup;
