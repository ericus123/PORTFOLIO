import { types } from "../types";
import http from "../../../utils/axios/axios";

export const passResetRequest = (Email) => async (dispatch) => {
  try {
    dispatch({ type: types.PASSWORD_RESET_CLICKED });
    const res = await http.post("/api/auth/password/resetlink", {
      email: Email,
    });
    dispatch({ type: types.PASSWORD_RESET_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: types.PASSWORD_RESET_ERROR,
      payload: error.response.data.error
        ? error.response.data.error
        : "Error occured",
    });
    setTimeout(() => {
      dispatch({ type: types.REMOVE_PASSWORD_RESET_ERROR });
    }, 5000);
  }
};

export const resetPassword =
  (Token, Password, PasswordConf) => async (dispatch) => {
    try {
      dispatch({ type: types.PASSWORD_RESET_CLICKED });
      const res = await http.put(`/api/auth/password/reset/user/${Token}`, {
        password: Password,
        passwordConf: PasswordConf,
      });
      dispatch({ type: types.PASSWORD_RESET_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({
        type: types.PASSWORD_RESET_ERROR,
        payload: error.response.data.error,
      });
      setTimeout(() => {
        dispatch({ type: types.REMOVE_PASSWORD_RESET_ERROR });
      }, 5000);
    }
  };

export const changePassword = (password, passwordConf) => async (dispatch) => {
  try {
    dispatch({ type: types.PASSWORD_CHANGE_CLICKED });
    const res = await http.patch("/api/auth/password/change", {
      password: password,
      passwordConf: passwordConf,
    });
    dispatch({ type: types.PASSWORD_CHANGE_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: types.PASSWORD_CHANGE_ERROR,
      payload: error.response.data.error,
    });
    setTimeout(() => {
      dispatch({ type: types.REMOVE_PASSWORD_CHANGE_ERROR });
    }, 5000);
  }
};
