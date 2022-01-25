import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  getProfileRequest,
  deleteAccountToken,
} from "../redux/actions/profile/profile";
import { authRequest } from "../redux/actions/auth/checkAuth";
import AdBanner from "../comps/ads";
import styles from "../comps/profile/index.module.scss";
import AboutData from "../comps/profile/AboutData";
import UpdateForm from "../comps/profile/UpdateForm";
import CompleteForm from "../comps/profile/CompleteForm";
import ShowSettings from "../comps/profile/ShowSettings";
import ProfileHeader from "../comps/profile/ProfileHeader";
import ProfileNav from "../comps/profile/ProfileNav";
import ProfileImage from "../comps/profile/ProfileImage";

const Profile = () => {
  const [active, setActive] = useState("about");
  const [show, setShow] = useState(true);
  const profile = useSelector((state) => state.getProfile.profile);
  const error = useSelector((state) => state.getProfile.error);
  const [modalShow, setModalShow] = React.useState(false);
  const changePasswordError = useSelector(
    (state) => state.changePassword.error
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
  }, [changeAvatarMessage]);

  if (deleteTokenMessage) {
    setTimeout(() => {
      setModalShow(false);
    }, 1000);
  }

  return (
    <div className={`profile ${styles.profile_page}`}>
      {profile ? (
        <>
          <div>
            <ProfileImage
              changeAvatarError={changeAvatarError}
              changeAvatarIsLoading={changeAvatarIsLoading}
              loadingImg={loadingImg}
              setLoadingImg={setLoadingImg}
              profile={profile}
            />
            <AdBanner
              data-ad-slot="7105763628"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>
          <div className="profile_details">
            <br />
            <ProfileHeader
              profile={profile}
              show={show}
              setActive={setActive}
              setShow={setShow}
            />
            <br />
            <br />
            <ProfileNav
              active={active}
              setActive={setActive}
              profile={profile}
            />
            <br />
            <br />
            <br />
            {active == "about" ? (
              <AboutData profile={profile} />
            ) : active == "update" ? (
              <UpdateForm
                updateProfileError={updateProfileError}
                updateProfileIsLoading={updateProfileIsLoading}
                profile={profile}
              />
            ) : active == "complete" ? (
              <CompleteForm
                completeProfileError={completeProfileError}
                completeProfileIsLoading={completeProfileIsLoading}
              />
            ) : active == "settings" ? (
              <ShowSettings
                modalShow={modalShow}
                setModalShow={setModalShow}
                deleteTokenError={deleteTokenError}
                deleteTokenIsLoading={deleteTokenIsLoading}
                deleteAccountToken={deleteAccountToken}
              />
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Profile;
