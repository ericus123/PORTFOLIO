import NewsLetter from "../../../comps/layouts/NewsLetter";
import styles from "./index.module.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unsubscribeNewsletter } from "../../../redux/actions/subscriptions/newsLetter";
import { simpleAlert } from "../../Alerts";
import { Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/fontawesome-free-solid";

const NewsletterUnsubscribe = ({ email }) => {
  const { error, msg, isLoading } = useSelector(
    (state) => state.unsubscribeNewsletter
  );
  const dispatch = useDispatch();
  console.log(msg);
  useEffect(() => dispatch(unsubscribeNewsletter(email)), []);
  return (
    <NewsLetter>
      <div className={styles.unsubscribe_container}>
        {(msg && (
          <h2 className="section-title">
            <FontAwesomeIcon
              icon={faCheckCircle}
              style={{ color: "success", marginRight: "5px" }}
            />
            Unsubscribed
          </h2>
        )) || (
          <h1 className={`${styles.unsubscribe_title} section-title`}>
            Unsubscribe
          </h1>
        )}

        <div className="contact__container bd-grid">
          {error && <>{simpleAlert("danger", error)}</>}
          {isLoading && !msg && (
            <div style={{ textAlign: "center" }}>
              <Spinner animation="border" size="md" role="status"></Spinner>
            </div>
          )}
          {msg && <>{simpleAlert("success", msg)}</>}
        </div>
      </div>
    </NewsLetter>
  );
};

export default NewsletterUnsubscribe;
