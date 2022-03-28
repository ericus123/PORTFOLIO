import { types } from "../../actions/types";

const subscribenewsLetterInitialState = {
  msg: null,
  error: null,
  email: null,
  isLoading: false,
};

export const subscribeNewsletter = (
  state = subscribenewsLetterInitialState,
  action
) => {
  switch (action.type) {
    case types.SUBSCRIBE_NEWSLETTER_CLICKED:
      return {
        ...state,
        isLoading: true,
      };
    case types.SUBSCRIBE_NEWSLETTER_SUCCESS:
      return {
        ...state,
        msg: action.payload.msg,
        email: action.payload.email,
        isLoading: false,
      };
    case types.REMOVE_SUBSCRIBE_NEWSLETTER_MESSAGE:
      return {
        ...state,
        msg: null,
        isLoading: false,
      };
    case types.SUBSCRIBE_NEWSLETTER_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        msg: null,
      };
    case types.REMOVE_SUBSCRIBE_NEWSLETTER_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const unsubscribeNewsletter = (
  state = { ...subscribenewsLetterInitialState },
  action
) => {
  switch (action.type) {
    case types.UNSUBSCRIBE_NEWSLETTER_CLICKED:
      return {
        ...state,
        isLoading: true,
      };
    case types.UNSUBSCRIBE_NEWSLETTER_SUCCESS:
      return {
        ...state,
        msg: action.payload.msg,
        email: action.payload.email,
        isLoading: false,
      };
    case types.UNSUBSCRIBE_NEWSLETTER_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        msg: null,
      };
    default:
      return state;
  }
};
