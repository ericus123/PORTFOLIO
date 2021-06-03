import { types } from "../../actions/types";

const initialState = {
  message: null,
  error: null,
  isLoading: false,
  email: null,
};
const confirmEmailInitState = {
  message: null,
  error: null,
  isLoading: false,
  isVerified: false,
};
export const signup = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGNUP_CLICKED:
      return {
        ...state,
        isLoading: true,
        email: action.payload,
      };
    case types.SIGNUP_SUCCESS:
      return {
        ...state,
        message: action.payload.msg,
        isLoading: false,
        isLoggedIn: true,
        error: null,
      };

    case types.SIGNUP_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        isLoggedIn: false,
        message: "",
      };
    case types.REMOVE_SIGNUP_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
export const confirmEmail = (state = confirmEmailInitState, action) => {
  switch (action.type) {
    case types.CONFIRM_EMAIL_CLICKED:
      return {
        ...state,
        isLoading: true,
      };
    case types.CONFIRM_EMAIL_SUCCESS:
      return {
        ...state,
        message: action.payload.msg,
        isLoading: false,
        isVerified: true,
      };

    case types.CONFIRM_EMAIL_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case types.REMOVE_CONFIRM_EMAIL_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
