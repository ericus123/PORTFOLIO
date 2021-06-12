import { types } from "../../actions/types";

const initialState = {
  message: null,
  error: null,
  isLoading: false,
  isLoggedIn: false,
  user:null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CHECK_AUTH_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case types.CHECK_AUTH_SUCCESS:
      return {
        ...state,
        message: action.payload.msg,
        isLoading: false,
        isLoggedIn: true,
        user: action.payload.user
      };

    case types.CHECK_AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};
