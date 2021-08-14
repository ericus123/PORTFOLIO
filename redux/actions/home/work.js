import { types } from "../types";
import http from "../../../utils/axios/axios";

export const GetWorks = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_WORKS_ISLOADING });
    const res = await http.get(`/api/home/works`);
    dispatch({ type: types.GET_WORKS_SUCCESS, payload: res.data });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: types.GET_WORKS_ERROR,
      payload: error.response.data.error || "Error occured",
    });
    setTimeout(() => { dispatch({
      type: types.REMOVE_GET_WORKS_ERROR,
      payload: error.response.data.error || "Error occured",
    })}, 5000)
  }
};