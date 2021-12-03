import axios from "../helpers/axios";
import { postConstants } from "../constants";

export const getAllPosts = () => {
  //console.log(user);

  return async (dispatch) => {
    dispatch({ type: postConstants.GET_ALL_POSTS_REQUEST });
    const res = await axios.get(`Posts`, {});
    if (res.status === 200) {
      const posts = res.data;
      dispatch({
        type: postConstants.GET_ALL_POSTS_SUCCESS,
        payload: {
          posts,
        },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: postConstants.GET_ALL_POSTS_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};
