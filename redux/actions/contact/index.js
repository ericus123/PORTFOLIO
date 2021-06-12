import { types } from "../types";
import http from "../../../utils/axios/axios";

export const messageRequest = (Name, Email, Message) => async (dispatch) => {
  try {
    dispatch({ type: types.CONTACT_CLICKED });
    const res = await http.post("/api/messages", {
      name: Name,
      email: Email,
      message: Message,
    });
    dispatch({ type: types.CONTACT_SUCCESS, payload: res.data });
    setTimeout(() => {
      dispatch({ type: types.REMOVE_CONTACT_MESSAGE });
    }, 5000);
  } catch (error) {
    dispatch({
      type: types.CONTACT_ERROR,
      payload: error.response.data || "Error occured",
    });

    setTimeout(() => {
      dispatch({ type: types.REMOVE_CONTACT_ERROR });
    }, 5000);
  }
};
