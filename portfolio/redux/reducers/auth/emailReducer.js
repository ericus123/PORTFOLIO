import { types } from "../../actions/types";

const initialState = {
  message: null,
  error: null,
  email: null,
  isLoading: false,
};

export const sendConfirmation = (state = initialState, action) => {
  switch (action.type) {
    case types.SEND_CONFIRM_CLICKED:
      return {
        ...state,
        isLoading: true,
        message: null,
        error: null,
      };
    case types.SEND_CONFIRM_SUCCESS:
      return {
        ...state,
        message: action.payload.msg,
        email: action.payload.email,
        isLoading: false,
      };

    case types.SEND_CONFIRM_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case types.REMOVE_SEND_CONFIRM_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
