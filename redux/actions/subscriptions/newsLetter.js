import { types } from "../types";
import http from "../../../utils/axios/axios";
import { NotificationManager } from "react-notifications";

export const subscribeNewsletter = (Email) => async (dispatch) => {
  try {
    dispatch({ type: types.SUBSCRIBE_NEWSLETTER_CLICKED });
    const res = await http.post("/api/subscriptions/newsletter/subscribe", {
      email: Email,
    });
    dispatch({ type: types.SUBSCRIBE_NEWSLETTER_SUCCESS, payload: res.data });
    NotificationManager.success(
      "Subscribed to newsletter successfully",
      "SUCCESS"
    );
  } catch (error) {
    dispatch({
      type: types.SUBSCRIBE_NEWSLETTER_ERROR,
      payload: error.response.data.error,
    });
    let err = error.response.data.error || "Something Went Wrong";
    NotificationManager.error(`${err}`, "ERROR");
  }
};

export const unsubscribeNewsletter = (email) => async (dispatch) => {
  try {
    dispatch({ type: types.UNSUBSCRIBE_NEWSLETTER_CLICKED });
    const res = await http.post(
      `/api/subscriptions/newsletter/unsubscribe/${email}`
    );
    dispatch({ type: types.UNSUBSCRIBE_NEWSLETTER_SUCCESS, payload: res.data });
    NotificationManager.success(
      "Unsubscribed to newsletter successfully",
      "SUCCESS"
    );
  } catch (error) {
    dispatch({
      type: types.UNSUBSCRIBE_NEWSLETTER_ERROR,
      payload: error.response.data.error,
    });
    let err = error.response.data.error || "Something Went Wrong";
    NotificationManager.error(`${err}`, "ERROR");
  }
};
