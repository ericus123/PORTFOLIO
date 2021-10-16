import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spinner, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { loginRequest } from "../redux/actions/auth/login";
import { authRedirect } from "../utils/redirects";
import { simpleAlert } from "../comps/Alerts";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

const Login = () => {
  const error = useSelector((state) => state.login.error);
  const message = useSelector((state) => state.login.message);
  const email = useSelector((state) => state.login.email);
  const isLoading = useSelector((state) => state.login.isLoading);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  const dispatch = useDispatch();

  authRedirect();

  const handleSubmit = (e) => {
    e.preventDefault();

    const Email = e.target.email.value;
    const Password = e.target.password.value;
    dispatch(loginRequest(Email, Password));
  };
  let router = useRouter();
  if (error === "Your account has not been verified") {
    setTimeout(() => {
      router.push(`/account/verify/${email}`);
    }, 2000);
  }
  return (
    <>
      <Head>
        <title>AMANI Eric | Login</title>
        <meta
          name="description"
          content="Login to get tutorials and trends in programming"
        />
      </Head>
      <div className="login">
        <h2 className="section-title login_title">Login</h2>
        <div className="contact__container login_container bd-grid">
          <form className="contact__form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="contact__input"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="cc-csc"
              className="contact__input"
            />
            <Row>
              {!error && !message && !isLoading ? (
                <Col>
                  <Row style={{ width: "100%" }}>
                    <span style={{ textAlign: "center" }}>
                      Don't have account ?
                      <Link href="/signup" shallow={true}>
                        <a style={{ textDecoration: "none" }}>Signup</a>
                      </Link>
                    </span>
                  </Row>
                  <Row style={{ width: "100%" }}>
                    <span style={{ textAlign: "center" }}>
                      Forgot password? click{" "}
                      <Link href="/password/reset" shallow={true}>
                        <a style={{ textDecoration: "none" }}>here</a>
                      </Link>
                    </span>
                  </Row>
                </Col>
              ) : null}

              <Col style={{ width: "100%" }}>
                {error ? <>{simpleAlert("danger", error)}</> : null}

                {message ? <>{simpleAlert("success", message)}</> : null}
                {isLoading ? (
                  <div style={{ textAlign: "center" }}>
                    <Spinner
                      animation="border"
                      size="md"
                      role="status"
                    ></Spinner>
                  </div>
                ) : message ? null : (
                  <button type="submit" className="contact__button button">
                    Login
                  </button>
                )}
              </Col>
            </Row>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
