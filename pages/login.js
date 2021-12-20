import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";
import { loginRequest } from "../redux/actions/auth/login";
import { authRedirect } from "../utils/redirects";
import { simpleAlert } from "../comps/Alerts";
import { useRouter } from "next/router";
import Head from "next/head";
import GoogleAuth from "../comps/auth/GoogleAuth";
import AuthButton from "../comps/auth/AuthButton";
import AuthLinks from "../comps/auth/AuthLinks";

const Login = () => {
  const error = useSelector((state) => state.login.error);
  const message = useSelector((state) => state.login.message);
  const email = useSelector((state) => state.login.email);
  const isLoading = useSelector((state) => state.login.isLoading);

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
        <h2 className="section-title login_title">SignIn</h2>
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

            {!error && !message && !isLoading && <AuthLinks type="login" />}

            <div style={{ width: "100%" }}>
              {error ? <>{simpleAlert("danger", error)}</> : null}

              {message ? <>{simpleAlert("success", message)}</> : null}
              {isLoading ? (
                <div style={{ textAlign: "center" }}>
                  <Spinner animation="border" size="md" role="status"></Spinner>
                </div>
              ) : message ? null : (
                <>
                  <AuthButton text="Login" type="submit" />
                  <GoogleAuth />
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
