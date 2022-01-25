import { Row } from "react-bootstrap";

const ProfileNav = ({ setActive, active, profile }) => {
  return (
    <Row className="prof_nav">
      <ul>
        <li
          className={active == "about" && "on"}
          onClick={() => {
            setActive("about");
          }}
        >
          About
        </li>
        {profile.isComplete ? (
          <li
            className={active == "update" && "on"}
            onClick={() => {
              setActive("update");
            }}
          >
            Update
          </li>
        ) : (
          <li
            className={active == "complete" && "on"}
            onClick={() => {
              setActive("complete");
            }}
          >
            Complete
          </li>
        )}
        <li
          className={active == "settings" && "on"}
          onClick={() => {
            setActive("settings");
          }}
        >
          Settings
        </li>
      </ul>
    </Row>
  );
};

export default ProfileNav;
