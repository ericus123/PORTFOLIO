import { types } from "../../actions/types";

const profileInitialState = {
  error: null,
  isLoading: false,
  profile: null,
};
const deleteTokenInitialState = {
  error: null,
  isLoading: false,
  profile: null,
};
const deleteAccountInitialState = {
  error: null,
  isLoading: false,
  profile: null,
};
const completeProfileInitialState = {
  error: null,
  isLoading: false,
  message: null,
};
const updateProfileInitialState = {
  error: null,
  isLoading: false,
  message: null,
};
const changeAvatarInitialState = {
  error: null,
  isLoading: false,
  message: null,
  url: null,
};

export const getProfile = (state = profileInitialState, action) => {
  switch (action.type) {
    case types.GET_PROFILE_ISLOADING:
      return {
        ...state,
        error: null,
        isLoading: true,
        profile: null,
      };
    case types.GET_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profile: action.payload.profile,
      };

    case types.GET_PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const changeAvatar = (state = changeAvatarInitialState, action) => {
  switch (action.type) {
    case types.CHANGE_AVATAR_ISLOADING:
      return {
        ...state,
        isLoading: true,
        message: null,
        error: null,
      };
    case types.CHANGE_AVATAR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.payload.msg,
        url: action.payload.url,
      };
    case types.REMOVE_CHANGE_AVATAR_SUCCESS:
      return {
        ...state,
        message: null,
      };
    case types.CHANGE_AVATAR_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case types.REMOVE_CHANGE_AVATAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const completeProfile = (
  state = completeProfileInitialState,
  action
) => {
  switch (action.type) {
    case types.COMPLETE_PROFILE_ISLOADING:
      return {
        ...state,
        isLoading: true,
        message: null,
        error: null,
      };
    case types.COMPLETE_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.payload.msg,
      };
    case types.REMOVE_COMPLETE_PROFILE_SUCCESS:
      return {
        ...state,
        message: null,
      };
    case types.COMPLETE_PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case types.REMOVE_COMPLETE_PROFILE_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const updateProfile = (state = updateProfileInitialState, action) => {
  switch (action.type) {
    case types.UPDATE_PROFILE_ISLOADING:
      return {
        ...state,
        isLoading: true,
        message: null,
        error: null,
      };
    case types.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.payload.msg,
      };
    case types.REMOVE_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        message: null,
      };
    case types.UPDATE_PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case types.REMOVE_UPDATE_PROFILE_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const deleteAccountToken = (state = deleteTokenInitialState, action) => {
  switch (action.type) {
    case types.DELETE_ACCOUNT_TOKEN_ISLOADING:
      return {
        ...state,
        isLoading: true,
        message: null,
        error: null,
      };
    case types.DELETE_ACCOUNT_TOKEN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.payload.msg,
      };
    case types.REMOVE_DELETE_ACCOUNT_TOKEN_SUCCESS:
      return {
        ...state,
        message: null,
      };
    case types.DELETE_ACCOUNT_TOKEN_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case types.REMOVE_DELETE_ACCOUNT_TOKEN_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const deleteAccount = (state = deleteAccountInitialState, action) => {
  switch (action.type) {
    case types.DELETE_ACCOUNT_ISLOADING:
      return {
        ...state,
        isLoading: true,
        message: null,
        error: null,
      };
    case types.DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.payload.msg,
      };
    case types.REMOVE_DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: null,
      };
    case types.DELETE_ACCOUNT_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case types.REMOVE_DELETE_ACCOUNT_ERROR:
      return {
        ...state,
        error: null,
        isLoading: false,
      };
    default:
      return state;
  }
};
