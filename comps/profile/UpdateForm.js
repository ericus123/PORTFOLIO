import { Form, Col, Button, Spinner } from "react-bootstrap";
import { simpleAlert } from "../Alerts";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../redux/actions/profile/profile";

const UpdateForm = ({
  profile,
  updateProfileError,
  updateProfileIsLoading,
}) => {
  const dispatch = useDispatch();
  const update_Profile = (e) => {
    e.preventDefault();
    const first_name = e.target.first_name.value;
    const last_name = e.target.last_name.value;
    const user_name = e.target.user_name.value;
    const occupation = e.target.occupation.value;
    const gender = e.target.gender.value;
    const bio = e.target.bio.value;
    dispatch(
      updateProfile(first_name, last_name, user_name, occupation, gender, bio)
    );
  };

  return (
    <Form
      onSubmit={(e) => {
        update_Profile(e);
      }}
    >
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ex: JOHN"
            name="first_name"
            defaultValue={profile.firstName}
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ex: Doe"
            name="last_name"
            defaultValue={profile.lastName}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ex: john123"
            name="user_name"
            defaultValue={profile.username}
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Occupation</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ex: Software developer"
            name="occupation"
            defaultValue={profile.occupation}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Gender</Form.Label>
          <Form.Control as="select" name="gender" defaultValue={profile.gender}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Prefer Not To Say">Prefer Not To Say</option>
          </Form.Control>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="bio"
            defaultValue={profile.bio}
          />
        </Form.Group>
      </Form.Row>
      {updateProfileError ? simpleAlert("danger", updateProfileError) : null}
      <br />
      <Button
        style={{ float: "right", color: "white" }}
        variant="primary"
        type="submit"
        disabled={updateProfileIsLoading}
      >
        {(updateProfileIsLoading && (
          <Spinner size="sm" animation="border"></Spinner>
        )) ||
          "Update"}
      </Button>
    </Form>
  );
};

export default UpdateForm;
