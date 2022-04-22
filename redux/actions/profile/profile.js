import { types } from "../types";
import http from "../../../utils/axios/axios";
import { NotificationManager } from "react-notifications";
import { authRequest } from "../auth/checkAuth";

export const getProfileRequest = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_PROFILE_ISLOADING });
    const res = await http.get("/api/profile");
    dispatch({ type: types.GET_PROFILE_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: types.GET_PROFILE_ERROR,
      payload: error.response.data.error || "Error occured",
    });
  }
};

export const changePassword = () => async (dispatch) => {
  try {
    dispatch({ type: types.CHANGE_PASSWORD_ISLOADING });
    const res = await http.patch("/api/auth/password/change");
    dispatch({ type: types.CHANGE_PASSWORD_SUCCESS, payload: res.data });
    setTimeout(() => {
      dispatch({ type: types.REMOVE_CHANGE_PASSWORD_SUCCESS });
    }, 3000);
  } catch (error) {
    dispatch({
      type: types.CHANGE_PASSWORD_ERROR,
      payload: error.response.data.error || "Error occured",
    });
    setTimeout(() => {
      dispatch({ type: types.REMOVE_CHANGE_PASSWORD_ERROR });
    }, 3000);
  }
};

export const changeAvatar = (image) => async (dispatch) => {
  try {
    dispatch({ type: types.CHANGE_AVATAR_ISLOADING });
    const res = await http.patch("/api/profile/change", { image: image });
    dispatch({ type: types.CHANGE_AVATAR_SUCCESS, payload: res.data });
    dispatch(getProfileRequest());
    NotificationManager.success("Updated Successfully", "SUCCESS");
  } catch (error) {
    dispatch({
      type: types.CHANGE_AVATAR_ERROR,
      payload: error.response.data.error || "Error occured",
    });
    NotificationManager.error("Something Went Wrong", "ERROR");
    setTimeout(() => {
      dispatch({ type: types.REMOVE_CHANGE_AVATAR_ERROR });
    }, 3000);
  }
};

export const completeProfile =
  (Occupation, Gender, Bio) => async (dispatch) => {
    try {
      dispatch({ type: types.COMPLETE_PROFILE_ISLOADING });
      const res = await http.patch("/api/profile/", {
        occupation: Occupation,
        gender: Gender,
        bio: Bio,
      });
      dispatch({ type: types.COMPLETE_PROFILE_SUCCESS, payload: res.data });
      NotificationManager.success("Profile Completed Successfuly", "SUCCESS");
      window.location.reload();
      setTimeout(() => {
        dispatch({ type: types.REMOVE_COMPLETE_PROFILE_SUCCESS });
      }, 3000);
    } catch (error) {
      NotificationManager.error("Something Went Wrong", "ERROR");
      dispatch({
        type: types.COMPLETE_PROFILE_ERROR,
        payload: error.response.data.error || "Error occured",
      });
      setTimeout(() => {
        dispatch({
          type: types.REMOVE_COMPLETE_PROFILE_ERROR,
        });
      }, 3000);
    }
  };

export const updateProfile =
  (FirstName, LastName, Username, Occupation, Gender, Bio) =>
  async (dispatch) => {
    try {
      dispatch({ type: types.UPDATE_PROFILE_ISLOADING });
      const res = await http.put("/api/profile/", {
        firstName: FirstName,
        lastName: LastName,
        username: Username,
        occupation: Occupation,
        gender: Gender,
        bio: Bio,
      });
      dispatch({ type: types.UPDATE_PROFILE_SUCCESS, payload: res.data });
      NotificationManager.success("Updated Successfully", "SUCCESS");
      dispatch(getProfileRequest());
      dispatch(authRequest());
    } catch (error) {
      dispatch({
        type: types.UPDATE_PROFILE_ERROR,
        payload: error.response.data.error || "Error occured",
      });
      NotificationManager.error("Something Went Wrong", "ERROR");
      setTimeout(() => {
        dispatch({ type: types.REMOVE_UPDATE_PROFILE_ERROR });
      }, 3000);
    }
  };

export const deleteAccountToken = (token) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_ACCOUNT_TOKEN_ISLOADING });
    const res = await http.post("/api/profile/delete-token", {
      headers: {
        "access-token": token,
      },
    });
    dispatch({ type: types.DELETE_ACCOUNT_TOKEN_SUCCESS, payload: res.data });
    setTimeout(() => {
      dispatch({ type: types.REMOVE_DELETE_ACCOUNT_TOKEN_SUCCESS });
    },30000);
  } catch (error) {
    dispatch({
      type: types.DELETE_ACCOUNT_TOKEN_ERROR,
      payload: error.response.data.error || "Error occured",
    });
    setTimeout(() => {
      dispatch({ type: types.REMOVE_DELETE_ACCOUNT_TOKEN_ERROR });
    }, 3000);
  }
};

export const deleteAccount = (token) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_ACCOUNT_ISLOADING });
    const res = await http.delete(`/api/profile/${token}`);
    dispatch({ type: types.DELETE_ACCOUNT_SUCCESS, payload: res.data });

    const msg = res.data.message || "Account Deleted Successfully";
    NotificationManager.success(`${msg}`, "SUCCESS");
    setTimeout(() => {
      process.browser ? localStorage.clear() : null;
      process.browser ? window.location.assign("/login") : null;
    }, 5000);
  } catch (error) {
    dispatch({
      type: types.DELETE_ACCOUNT_ERROR,
      payload: error.response.data.error || "Error occured",
    });
  }
};
