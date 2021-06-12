import { types } from "../../actions/types";

const initialState = {
  error: null,
  message: null,
  isLoading: false,
  msg: null,
};

export const sendMessage = (state = initialState, action) => {
  switch (action.type) {
    case types.CONTACT_CLICKED:
      return {
        ...state,
        isLoading: true,
        error: null,
        msg: null,
        message: null,
      };
    case types.CONTACT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        msg: action.payload.success,
        message: action.payload.msg,
      };
    case types.REMOVE_CONTACT_MESSAGE:
      return {
        ...state,
        msg: null,
      };
    case types.CONTACT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    case types.REMOVE_CONTACT_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
