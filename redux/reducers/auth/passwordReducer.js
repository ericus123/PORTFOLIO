import { types } from "../../actions/types";

const initialState = {
  message: null,
  error: null,
  email: null,
  isLoading: false,
};

export const resetPassword = (state = initialState, action) => {
  switch (action.type) {
    case types.PASSWORD_RESET_CLICKED:
      return {
        ...state,
        isLoading: true,
        message: null,
        error: null,
      };
    case types.PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        message: action.payload.msg,
        email: action.payload.email,
        isLoading: false,
      };

    case types.PASSWORD_RESET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case types.REMOVE_PASSWORD_RESET_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const changePassword = (state = initialState, action) => {
  switch (action.type) {
    case types.PASSWORD_CHANGE_CLICKED:
      return {
        ...state,
        isLoading: true,
        message: null,
        error: null,
      };
    case types.PASSWORD_CHANGE_SUCCESS:
      return {
        ...state,
        message: action.payload.msg,
        isLoading: false,
      };
    case types.REMOVE_PASSWORD_CHANGE_SUCCESS:
        return {
          ...state,
          message: null,
        };
    case types.PASSWORD_CHANGE_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case types.REMOVE_PASSWORD_CHANGE_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
