/* eslint-disable import/no-anonymous-default-export */
import { authConstants } from "../constants";

const initState = {
  jwt: null,
  user: null,
  authenticate: false,
  authenticating: false,
  loading: false,
  error: null,
  message: "",
};

export default (state = initState, action) => {
  //console.log(action);
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
      };
      break;
    case authConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        jwt: action.payload.jwt,
        authenticate: true,
        authenticating: false,
      };
      break;

    default:
  }
  return state;
};
