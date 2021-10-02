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
import ImgCrop from "antd-img-crop";
import { Upload } from "antd";

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
  const completeProfileIsLoading = useSelector(
    (state) => state.completeProfile.isLoading
  );
  const updateProfileError = useSelector((state) => state.updateProfile.error);
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
  const token = process.browser ? localStorage.getItem("auth-token") : null;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfileRequest());
  }, []);

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

  useEffect(() => {
      dispatch(authRequest(token));
  },[changeAvatarMessage])
  const uploadAvatar = async (file) => {
    setLoadingImg("avatar");
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


  const beforeUpload = (file) => {
    
  }
  function DeleteAccountModal(props) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
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
          disabled={deleteTokenIsLoading}
            onClick={() => {
              dispatch(deleteAccountToken());
            }}
          >
          {deleteTokenIsLoading? (
            <Spinner size="sm" animation="border"></Spinner>
          ) : (
            "Yes"
          )}
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
  if(deleteTokenMessage){
    setTimeout(() => {
      setModalShow(false);
    }, 1000);
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
          <Form.Group as={Col} >
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
          {updateProfileIsLoading ? (
            <Spinner size="sm" animation="border"></Spinner>
          ) : (
            "Update"
          )}
        </Button>
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
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Prefer Not To Say">Prefer Not To Say</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Profile Image</Form.Label>
            <Form.File
              id="exampleFormControlFile1"
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
              name="bio"
            />
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

  const showSettings = () => {
    return (
      <>
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
            </li>
          </ul>
          {deleteTokenError ? simpleAlert("danger", deleteTokenError) : null}
          {deleteTokenMessage ? simpleAlert("success", deleteTokenMessage) : null}
          {!deleteTokenError && !deleteTokenMessage && !deleteTokenIsLoading ? (
            <Button onClick={() => setModalShow(true)} className="delete_acc">
              Continue
            </Button>
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
                  <ImgCrop>
   <Upload  beforeUpload={uploadAvatar}>
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
                ) :
                  <span style={{color: "white"}}>Change photo</span>
               }
                {changeAvatarError
                  ? simpleAlert("danger", changeAvatarError)
                  : null}
              </form>
              </Upload>
              </ImgCrop>
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
