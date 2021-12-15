import { types } from "../types";
import http from "../../../utils/axios/axios";
export const authRequest = () => async (dispatch) => {
  try {
    dispatch({ type: types.CHECK_AUTH_ISLOADING });
    const res = await http.get("/api/auth/check-login/");
    dispatch({ type: types.CHECK_AUTH_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: types.CHECK_AUTH_ERROR,
      payload: error.response?.data.error || "Error occured",
    });
    setTimeout(() => {
      dispatch({
        type: types.REMOVE_CHECK_AUTH_ERROR,
      });
    }, 5000);
  }
};
