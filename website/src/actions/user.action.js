import axios from "../helpers/axios";
import { userConstants } from "../constants";
import { getAllPosts } from "./post.actions";

export const signup = (user) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST });
    const res = await axios.post(`/Users`, {
      ...user,
    });
    if (res.status === 200) {
      const { message } = res.data;
      dispatch({
        type: userConstants.USER_REGISTER_SUCCESS,
        payload: { message },
      });
    } else {
      dispatch({
        type: userConstants.USER_REGISTER_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const getUserByID = (userID) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.GET_USER_DETAIL_BY_ID_REQUEST });
    const res = await axios.get(`/Users/${userID}`);
    if (res.status === 200) {
      const user = res.data;
      dispatch({
        type: userConstants.GET_USER_DETAIL_BY_ID_SUCCESS,
        payload: { user },
      });
    } else {
      dispatch({
        type: userConstants.GET_USER_DETAIL_BY_ID_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const votePost = (data) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.VOTE_POST_REQUEST });
    const res = await axios.post("/Users/Vote", data);
    if (res.status === 200) {
      dispatch({
        type: userConstants.VOTE_POST_SUCCESS,
      });
      const localuser = localStorage.getItem("user");

      dispatch(getAllPosts());
      dispatch(getUserByID(JSON.parse(localuser).Iduser));
    } else {
      dispatch({
        type: userConstants.VOTE_POST_FAILURE,
      });
    }
  };
};
