import { Alert, Button } from "react-bootstrap";

const CompleteProfileAlert = ({ setActive, setShow, profile, show }) => {
  return (
    <>
      <Alert show={show} variant="info">
        <Alert.Heading>Hi {profile.firstName},</Alert.Heading>
        <p>
          It looks like your profile is missing some information. Please
          complete your profile
        </p>
        <div className="d-flex justify-content-end">
          <Button
            onClick={() => {
              setActive("complete");
              setShow(false);
            }}
            size="sm"
            variant="primary"
          >
            Okay
          </Button>
        </div>
      </Alert>
    </>
  );
};

export default CompleteProfileAlert;
