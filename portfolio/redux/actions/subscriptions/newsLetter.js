import { types } from "../types";
import http from "../../../utils/axios/axios";

export const subscribeNewsletter = (Email) => async (dispatch) => {
  try {
    console.log("something is really going on");
    dispatch({ type: types.SUBSCRIBE_NEWSLETTER_CLICKED });
    const res = await http.post("/api/subscriptions/newsletter/subscribe", {
      email: Email,
    });
    dispatch({ type: types.SUBSCRIBE_NEWSLETTER_SUCCESS, payload: res.data });
    setTimeout(() => {
      dispatch({ type: types.REMOVE_SUBSCRIBE_NEWSLETTER_MESSAGE });
    }, 5000);
  } catch (error) {
    dispatch({
      type: types.SUBSCRIBE_NEWSLETTER_ERROR,
      payload: error.response.data,
    });
    setTimeout(() => {
      dispatch({ type: types.REMOVE_SUBSCRIBE_NEWSLETTER_ERROR });
    }, 5000);
  }
};
