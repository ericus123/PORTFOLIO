import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Spinner } from "react-bootstrap";
import { passResetRequest } from "../../../redux/actions/auth/password";
import { authRedirect } from "../../../utils/redirects";
import { faLock } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { simpleAlert } from "../../../comps/Alerts";
import { useRouter } from "next/router";
import { types } from "../../../redux/actions/types";

import errors from "../../../utils/errors.json";

const ResetPassword = () => {
  const { error, message, email, isLoading } = useSelector(
    (state) => state.resetPassword
  );
  const dispatch = useDispatch();

  let router = useRouter();

  const [_email, setEmail] = useState("");

  authRedirect();
  const handleSubmit = (e) => {
    e.preventDefault();
    const Email = e.target.email.value;
    setEmail(Email);
    dispatch(passResetRequest(Email));
    e.target.reset();
  };

  useEffect(() => {
    error?.length &&
      error === errors.reset_unverified &&
      dispatch({ type: types.LOGIN_CLICKED, payload: _email }) &&
      router.push(`/account/verify/${_email}`);
  }, [error]);

  return (
    <div className="account_verification_container">
      <h2 className="section-title">
        <FontAwesomeIcon icon={faLock} />
      </h2>
      <div className="contact__container bd-grid">
        <form className="contact__form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="contact__input"
            disabled={isLoading}
          />

          {error ? <>{simpleAlert("danger", error)}</> : null}
          {message ? (
            <Alert style={{ textAlign: "center" }} variant="success">
              A password reset link has been sent to <b>{email}</b>
              <br />
              didn&apos;t receive the email?{" "}
              <span
                style={{ color: "#007bff", cursor: "pointer" }}
                onClick={() => {
                  dispatch(passResetRequest(email));
                }}
              >
                resend
              </span>
            </Alert>
          ) : null}
          {isLoading ? (
            <div style={{ textAlign: "center" }}>
              <Spinner animation="border" size="md" role="status"></Spinner>
            </div>
          ) : message ? null : !error ? (
            <button className="passresreq__button">Reset Password</button>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
