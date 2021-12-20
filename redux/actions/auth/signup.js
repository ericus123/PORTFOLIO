import { types } from "../types";
import http from "../../../utils/axios/axios";

export const signupRequest = (formData) => async (dispatch) => {
  try {
    dispatch({ type: types.SIGNUP_CLICKED, payload: formData.Email });
    console.log(formData);
    const res = await http.post("/api/auth/register/", {
      firstName: formData.FirstName,
      lastName: formData.LastName,
      email: formData.Email,
      password: formData.Password,
      confPassword: formData.ConfPassword,
      username: formData.Username,
    });
    dispatch({ type: types.SIGNUP_SUCCESS, payload: res.data });
    localStorage.setItem("Unverified", res.data.email);
  } catch (error) {
    dispatch({
      type: types.SIGNUP_ERROR,
      payload: error.response.data.error
        ? error.response.data.error
        : "Error occured",
    });
    setTimeout(() => {
      dispatch({ type: types.REMOVE_SIGNUP_ERROR });
    }, 5000);
  }
};
export const confirmEmail = (email, token) => async (dispatch) => {
  try {
    dispatch({ type: types.CONFIRM_EMAIL_CLICKED });

    const res = await http.put(`/api/auth/verify/${email}/${token}`);
    dispatch({ type: types.CONFIRM_EMAIL_SUCCESS, payload: res.data });
  } catch (error) {
    const err = error.response.data.error;
    if (err && err === "Invalid Token") {
      dispatch({
        type: types.CONFIRM_EMAIL_ERROR,
        payload: "This verification link has expired",
      });
    } else {
      dispatch({
        type: types.CONFIRM_EMAIL_ERROR,
        payload: error.response.data.error
          ? error.response.data.error
          : "Error occured",
      });
    }
  }
};
