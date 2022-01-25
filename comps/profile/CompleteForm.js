import { Form, Col, Button, Spinner } from "react-bootstrap";
import { simpleAlert } from "../Alerts";
import { useDispatch } from "react-redux";
import { completeProfile } from "../../redux/actions/profile/profile";

const CompleteForm = ({ completeProfileError, completeProfileIsLoading }) => {
  const dispatch = useDispatch();

  const complete_Profile = (e) => {
    e.preventDefault();
    const occupation = e.target.occupation.value;
    const gender = e.target.gender.value;
    const bio = e.target.bio.value;
    dispatch(completeProfile(occupation, gender, bio));
  };
  return (
    <Form
      onSubmit={(e) => {
        complete_Profile(e);
      }}
    >
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Occupdation</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ex: Software developer"
            name="occupation"
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Gender</Form.Label>
          <Form.Control as="select" name="gender">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Prefer Not To Say">Prefer Not To Say</option>
          </Form.Control>
        </Form.Group>
      </Form.Row>
      <Form.Row></Form.Row>

      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Bio</Form.Label>
          <Form.Control as="textarea" rows={3} name="bio" />
        </Form.Group>
      </Form.Row>

      {completeProfileError
        ? simpleAlert("danger", completeProfileError)
        : null}
      <br />
      <Button
        disabled={completeProfileIsLoading}
        style={{ float: "right" }}
        variant="primary"
        type="submit"
      >
        {completeProfileIsLoading ? (
          <Spinner size="sm" animation="border"></Spinner>
        ) : (
          "Save"
        )}
      </Button>
    </Form>
  );
};

export default CompleteForm;
