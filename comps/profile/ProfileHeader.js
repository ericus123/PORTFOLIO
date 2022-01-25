import { Button } from "react-bootstrap";
import CompleteProfileAlert from "./CompleteProfileAlert";

const ProfileHeader = ({ profile, setActive, show, setShow }) => {
  return (
    <div className="upper_space">
      {!profile.isComplete && (
        <CompleteProfileAlert
          show={show}
          setActive={setActive}
          profile={profile}
          setShow={setShow}
        />
      )}
      <span>{`${profile.firstName} ${profile.lastName}`}</span>
      <br />
      {profile.isComplete ? (
        <span className="sp_2">{profile.occupation}</span>
      ) : null}
      {!profile.isComplete ? (
        <Button
          onClick={() => {
            setActive("complete");
          }}
          style={{
            float: "right",
            borderRadius: "1em",
            color: "white",
          }}
          variant="info"
        >
          Complete
        </Button>
      ) : null}

      {profile.isComplete ? (
        <Button
          onClick={() => {
            setActive("update");
          }}
          style={{
            float: "right",
            borderRadius: "1em",
            color: "white",
          }}
          variant="info"
        >
          Update
        </Button>
      ) : null}
    </div>
  );
};

export default ProfileHeader;
