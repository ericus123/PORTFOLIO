import { Button, Row } from "react-bootstrap";
import { simpleAlert } from "../Alerts";
import DeleteAccountModal from "./DeleteAccountModal";
import styles from "./index.module.scss";

const ShowSettings = ({
  deleteTokenError,
  deleteTokenIsLoading,
  deleteTokenMessage,
  modalShow,
  setModalShow,
}) => {
  return (
  <div>
<div className={styles.settings_under_construction}>
   <h1>Comming soon</h1>
   <p>This section is still under construction</p>
</div>

      {/* <Row className="row_6">
      <div>
        <h4 style={{ color: "red" }}>Danger Zone</h4>
        <h4>Delete Account</h4>
        <br />
        <p>Deleting your account will:</p>
      </div>
      <ul>
        <li>
          <span style={{ fontSize: "large" }}>&bull;</span>&nbsp;Delete your
          profile, along with your authentication associations.
        </li>
        <li>
          {" "}
          <p>
            {" "}
            <span style={{ fontSize: "large" }}>&bull;</span>&nbsp;Delete any
            and all content you have, such as articles, comments, your reading
            list or chat messages.
          </p>
        </li>
        <li>
          {" "}
          <span style={{ fontSize: "large" }}>&bull;</span>&nbsp;Allow your
          username to become available to anyone.
        </li>
        <li> </li>
      </ul>
      {deleteTokenError && simpleAlert("danger", deleteTokenError)}
      {deleteTokenMessage && simpleAlert("success", deleteTokenMessage)}
      {!deleteTokenError && !deleteTokenMessage && !deleteTokenIsLoading && (
        <Button onClick={() => setModalShow(true)} className="delete_acc">
          Continue
        </Button>
      )}

      <br />
      <br />
      <DeleteAccountModal show={modalShow} onHide={() => setModalShow(false)} />
    </Row> */}
  </div>
  );
};

export default ShowSettings;
