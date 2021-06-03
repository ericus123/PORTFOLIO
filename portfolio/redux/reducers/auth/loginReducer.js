import { types } from "../../actions/types";

const initialState = {
  message: null,
  error: null,
  email:null,
  isLoading: false,
  isLoggedIn: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_CLICKED:
      return {
        ...state,
        isLoading: true,
        email: action.payload,
        message: null,
        error: null,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        message: action.payload.msg,
        isLoading: false,
        isLoggedIn: true,
      };

    case types.LOGIN_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        isLoggedIn: false,
      };
    case types.REMOVE_LOGIN_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
