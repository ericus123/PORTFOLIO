import { types } from "../../actions/types";

const worksInitialState = {
  message: null,
  error: null,
  isLoading: false,
  works: [],
};

export const getWorks = (state = worksInitialState, action) => {
  switch (action.type) {
    case types.GET_WORKS_ISLOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case types.GET_WORKS_SUCCESS:
      return {
        ...state,
        message: action.payload.msg,
        isLoading: false,
        works: action.payload.works,
        error: null,
      };
    case types.REMOVE_GET_WORKS_SUCCESS:
      return {
        ...state,
        message: null,
        error: null,
      };
    case types.GET_WORKS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case types.REMOVE_GET_WORKS_ERROR:
      return {
        ...state,
        error: null,
        isLoading: false,
      };
    default:
      return state;
  }
};
