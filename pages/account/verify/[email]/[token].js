import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { confirmEmail } from "../../../../redux/actions/auth/signup";
import { useSelector, useDispatch } from "react-redux";
import { faCheckCircle } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { simpleAlert } from "../../../../comps/Alerts";
import { useRouter } from "next/router";
export const getServerSideProps = async (context) => {
  const token = context.params.token;
  return {
    props: { token: token },
  };
};
const ConfirmEmail = () => {
  const router = useRouter();
  const { email, token } = router.query;
  const error = useSelector((state) => state.confirmEmail.error);
  const message = useSelector((state) => state.confirmEmail.message);
  const isLoading = useSelector((state) => state.confirmEmail.isLoading);
  const isVerified = useSelector((state) => state.confirmEmail.isVerified);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(confirmEmail(email, token));
  }, []);

  const handleRedirects = () => {
    message &&
      setTimeout(() => {
        router.push("/login");
      }, 3000);
  };
  useEffect(() => {
    handleRedirects();
  }, [message, error]);
  return (
    <div className="account_verification_container">
      {(isVerified && (
        <h2 className="section-title">
          <FontAwesomeIcon
            icon={faCheckCircle}
            style={{ color: "success", marginRight: "5px" }}
          />
          Verified
        </h2>
      )) || <h2 className="section-title">Verification</h2>}

      <div className="contact__container bd-grid">
        {error && <>{simpleAlert("danger", error)}</>}
        {isLoading && (
          <div style={{ textAlign: "center" }}>
            <Spinner animation="border" size="md" role="status"></Spinner>
          </div>
        )}
        {message && <>{simpleAlert("success", message)}</>}
      </div>
    </div>
  );
};

export default ConfirmEmail;
