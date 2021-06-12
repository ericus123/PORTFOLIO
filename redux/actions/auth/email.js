import { types } from "../types";
import jwt_decode from "jwt-decode";
import http from "../../../utils/axios/axios";

export const sendConfirmation = (Email) => async (dispatch) => {
  try {
    dispatch({ type: types.SEND_CONFIRM_CLICKED });
    const res = await http.post(`/api/auth/confirmation/resend/${Email}`);
    dispatch({ type: types.SEND_CONFIRM_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: types.SEND_CONFIRM_ERROR,
      payload: error.response.data.error
        ? error.response.data.error
        : "Error occured",
    });
    setTimeout(() => {
      dispatch({ type: types.REMOVE_SEND_CONFIRM_ERROR });
    }, 5000);
  }
};
