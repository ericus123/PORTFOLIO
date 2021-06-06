import React, { useState, useEffect } from "react";
import avatar from "../assets/images/avatar.png";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Alert, Form, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import {
  getProfileRequest,
  changeAvatar,
  completeProfile,
  updateProfile,
  deleteAccountToken,
} from "../redux/actions/profile/profile";
import { Spinner, Modal } from "react-bootstrap";
import { changePassword } from "../redux/actions/auth/password";
import { LockFill } from "react-bootstrap-icons";
import { simpleAlert } from "../comps/Alerts";
import { authRequest } from "../redux/actions/auth/checkAuth";

const Profile = () => {
  const [active, setActive] = useState("about");
  const [show, setShow] = useState(true);
  const profile = useSelector((state) => state.getProfile.profile);
  const error = useSelector((state) => state.getProfile.error);
  const isLoading = useSelector((state) => state.getProfile.isLoading);
  const [modalShow, setModalShow] = React.useState(false);
  const changePasswordError = useSelector(
    (state) => state.changePassword.error
  );
  const changePasswordMessage = useSelector(
    (state) => state.changePassword.message
  );
  const changePasswordIsLoading = useSelector(
    (state) => state.changePassword.isLoading
  );
  const changeAvatarError = useSelector((state) => state.changeAvatar.error);
  const changeAvatarMessage = useSelector(
    (state) => state.changeAvatar.message
  );
  const changeAvatarIsLoading = useSelector(
    (state) => state.changeAvatar.isLoading
  );
  const completeProfileError = useSelector(
    (state) => state.completeProfile.error
  );
  const completeProfileMessage = useSelector(
    (state) => state.completeProfile.message
  );
  const completeProfileIsLoading = useSelector(
    (state) => state.completeProfile.isLoading
  );
  const updateProfileError = useSelector((state) => state.updateProfile.error);
  const updateProfileMessage = useSelector(
    (state) => state.updateProfile.message
  );
  const updateProfileIsLoading = useSelector(
    (state) => state.updateProfile.isLoading
  );
  const deleteTokenError = useSelector(
    (state) => state.deleteAccountToken.error
  );
  const deleteTokenMessage = useSelector(
    (state) => state.deleteAccountToken.message
  );
  const deleteTokenIsLoading = useSelector(
    (state) => state.deleteAccountToken.isLoading
  );

  const [loadingImg, setLoadingImg] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfileRequest());
  }, [updateProfileMessage, completeProfileMessage, changeAvatarMessage]);

  const errors_arr = [
    changeAvatarError,
    changePasswordError,
    completeProfileError,
    updateProfileError,
    deleteTokenError,
    error,
  ];
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    dispatch(authRequest(token));
    errors_arr.map((error) => {
      if (error === "Invalid Token") {
        localStorage.clear();
        router.push("/login");
      }
    });
  }, [
    changeAvatarError,
    changePasswordError,
    completeProfileError,
    updateProfileError,
    deleteTokenError,
    error,
  ]);

  const uploadAvatar = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    dispatch(changeAvatar(base64));
    setLoadingImg(null);
  };
  const uploadFile = async (e) => {
    setLoadingImg(null);
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setLoadingImg(base64);
  };
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handlePasswordChangeSubmit = (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const passwordConf = e.target.passwordConf.value;
    dispatch(changePassword(password, passwordConf));
    e.target.reset();
  };
  const complete_Profile = (e) => {
    e.preventDefault();
    const occupation = e.target.occupation.value;
    const gender = e.target.gender.value;
    const bio = e.target.bio.value;
    const image = loadingImg;
    dispatch(completeProfile(occupation, gender, image, bio));
    e.target.reset();
  };
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
  function DeleteAccountModal(props) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h4>Delete account</h4>
          <p>
            Are you sure you want to delete your account?
            <br />
            This action can't be undone{" "}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              props.onHide();
              dispatch(deleteAccountToken());
            }}
          >
            Yes
          </Button>
          <Button variant="danger" onClick={props.onHide}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  function AlertDismissible() {
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
  }
  const showUpdateForm = () => {
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
          <Form.Group as={Col} controlId="formGridEmail">
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
            <Form.Control
              as="select"
              name="gender"
              defaultValue={profile.gender}
            >
              <option>Male</option>
              <option>Female</option>
              <option>Prefer Not To Answer</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              controlId="exampleForm.ControlTextarea1"
              name="bio"
              defaultValue={profile.bio}
            />
          </Form.Group>
        </Form.Row>
        {updateProfileError ? simpleAlert("danger", updateProfileError) : null}
        {updateProfileMessage
          ? simpleAlert("success", updateProfileMessage)
          : null}
        {updateProfileIsLoading &&
        !updateProfileMessage &&
        !updateProfileError ? (
          <div style={{ textAlign: "center" }}>
            <Spinner animation="border" size="md" role="status"></Spinner>
          </div>
        ) : !updateProfileIsLoading &&
          !updateProfileMessage &&
          !updateProfileError ? (
          <>
            <br />
            <Button
              style={{ float: "right", color: "white" }}
              variant="primary"
              type="submit"
            >
              Update
            </Button>
          </>
        ) : null}
      </Form>
    );
  };
  const showAboutPage = () => {
    return (
      <div className="profile_about">
        {profile ? (
          <>
            {" "}
            <div className="detail">
              <span className="sp_1">First Name:</span>
              <span className="sp_2">{profile.firstName}</span>
            </div>
            <div className="detail">
              <span className="sp_1">Last Name</span>
              <span className="sp_2">{profile.lastName}</span>
            </div>
            <div className="detail">
              <span className="sp_1">Username</span>
              <span className="sp_2">{profile.username}</span>
            </div>
            <div className="detail">
              <span className="sp_1">Email</span>
              <span className="sp_2">{profile.email}</span>
            </div>
            <div className="detail">
              <span className="sp_1">User ID</span>
              <span className="sp_2">{profile._id}</span>
            </div>
            <div className="detail">
              <span className="sp_1">Role</span>
              <span className="sp_2">{profile.role}</span>
            </div>
            <div className="detail">
              <span className="sp_1">Occupation</span>
              <span className="sp_2">{profile.occupation}</span>
            </div>
            <div className="detail">
              <span className="sp_1">Gender</span>
              <span className="sp_2">{profile.gender}</span>
            </div>
            {profile.isComplete ? (
              <div className="bio">
                <span className="sp_1">Bio:</span>
                <p>{profile.bio}</p>
              </div>
            ) : null}{" "}
          </>
        ) : null}
      </div>
    );
  };
  const showCompleteForm = () => {
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
              <option>Male</option>
              <option>Female</option>
              <option>Prefer not to say</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.File
              id="exampleFormControlFile1"
              label="Profile Image"
              onChange={(e) => {
                uploadFile(e);
              }}
              required
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              controlId="exampleForm.ControlTextarea1"
              name="bio"
            />
          </Form.Group>
        </Form.Row>
        {completeProfileError
          ? simpleAlert("danger", completeProfileError)
          : null}
        {completeProfileMessage
          ? simpleAlert("success", completeProfileMessage)
          : null}
        {completeProfileIsLoading ? (
          <div style={{ textAlign: "center" }}>
            <Spinner animation="border" size="md" role="status"></Spinner>
          </div>
        ) : (
          <Button style={{ float: "right" }} variant="primary" type="submit">
            Save
          </Button>
        )}
      </Form>
    );
  };

  const showSettings = () => {
    return (
      <>
        <div>
          <div style={{ marginTop: "10%", marginBottom: "10%" }}>
            <h2 className="section-title">
              <LockFill size={24} /> Change Password
            </h2>
            <div className="contact__container bd-grid">
              <form
                className="contact__form"
                onSubmit={handlePasswordChangeSubmit}
              >
                <input
                  type="password"
                  placeholder="New password"
                  name="password"
                  className="contact__input"
                />
                <input
                  type="password"
                  placeholder="Confirm new password"
                  name="passwordConf"
                  className="contact__input"
                />

                {changePasswordError ? (
                  <>{simpleAlert("danger", changePasswordError)}</>
                ) : null}
                {changePasswordMessage ? (
                  <>{simpleAlert("success", changePasswordMessage)}</>
                ) : null}
                {changePasswordIsLoading ? (
                  <div style={{ textAlign: "center" }}>
                    <Spinner
                      animation="border"
                      size="md"
                      role="status"
                    ></Spinner>
                  </div>
                ) : changePasswordMessage ? null : (
                  <button className="passresreq__button">
                    Change Password
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
        <Row className="row_6">
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
                <span style={{ fontSize: "large" }}>&bull;</span>&nbsp;Delete
                any and all content you have, such as articles, comments, your
                reading list or chat messages.
              </p>
            </li>
            <li>
              {" "}
              <span style={{ fontSize: "large" }}>&bull;</span>&nbsp;Allow your
              username to become available to anyone.
            </li>
            <li>
              {" "}
              {deleteTokenIsLoading ? (
                <div style={{ textAlign: "center" }}>
                  <Spinner animation="border" size="md" role="status"></Spinner>
                </div>
              ) : null}
            </li>
          </ul>
          {deleteTokenError ? simpleAlert("danger", deleteTokenError) : null}
          {deleteTokenMessage
            ? simpleAlert("success", deleteTokenMessage)
            : null}
          {!deleteTokenError && !deleteTokenMessage && !deleteTokenIsLoading ? (
            <div onClick={() => setModalShow(true)} className="delete_acc">
              Delete Account
            </div>
          ) : null}

          <br />
          <br />
          <DeleteAccountModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </Row>
      </>
    );
  };
  return (
    <div className="profile">
      {profile ? (
        <>
          <div className="profile_picture">
            <img src={profile.avatar || avatar} />
            <div className="file">
              <form>
                {" "}
                {loadingImg == "avatar" ||
                (changeAvatarIsLoading && !changeAvatarError) ? (
                  <div style={{ textAlign: "center" }}>
                    <Spinner
                      animation="border"
                      size="md"
                      role="status"
                    ></Spinner>
                  </div>
                ) : !changeAvatarError && !changeAvatarMessage ? (
                  <>Change photo</>
                ) : null}
                {changeAvatarError
                  ? simpleAlert("danger", changeAvatarError)
                  : null}
                {changeAvatarMessage
                  ? simpleAlert("success", changeAvatarMessage)
                  : null}
                <input
                  type="file"
                  onChange={async (e) => {
                    setLoadingImg("avatar");
                    uploadAvatar(e);
                  }}
                />
              </form>
            </div>
          </div>
          <div className="profile_details">
            <br />
            <div className="upper_space">
              {!profile.isComplete ? <AlertDismissible /> : null}
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
                  style={{ float: "right", borderRadius: "1em" }}
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
            <br />
            <br />
            <Row className="prof_nav">
              <ul>
                <li
                  className={active == "about" ? "on" : null}
                  onClick={() => {
                    setActive("about");
                  }}
                >
                  About
                </li>
                {profile.isComplete ? (
                  <li
                    className={active == "update" ? "on" : null}
                    onClick={() => {
                      setActive("update");
                    }}
                  >
                    Update
                  </li>
                ) : (
                  <li
                    className={active == "complete" ? "on" : null}
                    onClick={() => {
                      setActive("complete");
                    }}
                  >
                    Complete
                  </li>
                )}
                <li
                  className={active == "settings" ? "on" : null}
                  onClick={() => {
                    setActive("settings");
                  }}
                >
                  Settings
                </li>
              </ul>
            </Row>
            <br />
            <br />
            <br />
            {active == "about"
              ? showAboutPage()
              : active == "update"
              ? showUpdateForm()
              : active == "complete"
              ? showCompleteForm()
              : active == "settings"
              ? showSettings()
              : null}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Profile;
