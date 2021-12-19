import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Spinner } from "react-bootstrap";
import { sendConfirmation } from "../../../../redux/actions/auth/email";
import { authRedirect } from "../../../../utils/redirects";
import { faEnvelope } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { simpleAlert } from "../../../../comps/Alerts";

const EmailVerification = () => {
  const email = useSelector((state) => state.login.email);
  const error = useSelector((state) => state.sendConfirmation.error);
  const message = useSelector((state) => state.sendConfirmation.message);
  const isLoading = useSelector((state) => state.sendConfirmation.isLoading);
  const dispatch = useDispatch();

  authRedirect();

  return (
    <div className="account_verification_container">
      <h2 className="section-title">
        <FontAwesomeIcon icon={faEnvelope} />
      </h2>
      <div className="contact__container bd-grid">
        {email && !isLoading && !error ? (
          <Alert style={{ textAlign: "center" }} variant="success">
            An account verification email has been sent to <b>{email}</b>
            <br />
            didn't receive the email?{" "}
            <span
              style={{ color: "#007bff", cursor: "pointer" }}
              onClick={() => {
                dispatch(sendConfirmation(email));
              }}
            >
              resend
            </span>
          </Alert>
        ) : null}
        {error ? <>{simpleAlert("danger", error)}</> : null}
        {isLoading ? (
          <div style={{ textAlign: "center" }}>
            <Spinner animation="border" size="md" role="status"></Spinner>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default EmailVerification;
