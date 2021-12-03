/* eslint-disable import/no-anonymous-default-export */
import { postConstants } from "../constants";

const initState = {
  posts: [],
  loading: false,
  error: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case postConstants.GET_ALL_POSTS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case postConstants.GET_ALL_POSTS_SUCCESS:
      state = {
        ...state,
        loading: false,
        posts: action.payload.posts,
      };
      break;
    case postConstants.GET_ALL_POSTS_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    default:
  }
  return state;
};
