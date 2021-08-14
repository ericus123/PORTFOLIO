import { types } from "../types";
import http from "../../../utils/axios/axios";

export const loginRequest = (Email, Password) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_CLICKED, payload: Email });
    const res = await http.post("/api/auth/login/", {
      email: Email,
      password: Password,
    });
    localStorage.setItem("auth-token", res.data.token);
    dispatch({ type: types.LOGIN_SUCCESS, payload: res.data });
   
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.LOGIN_ERROR,
      payload: error.response.data.error
        ? error.response.data.error
        : "Error occured",
    });
    setTimeout(() => {
      dispatch({ type: types.REMOVE_LOGIN_ERROR });
    }, 5000);
  }
};
