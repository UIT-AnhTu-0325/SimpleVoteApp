import axios from "../helpers/axios";
import { authConstants } from "../constants";
import { notification } from "antd";

export const signin = (user) => {
  //console.log(user);

  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });
    const res = await axios.post(`/login`, {
      ...user,
    });

    if (res.status === 200) {
      const { jwt, user } = res.data;
      localStorage.setItem("jwt", jwt);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          jwt,
          user,
        },
      });
    }
    console.log("ahjihi");
    if (!localStorage.getItem("jwt")) {
      notification.error({
        message: "Error",
        description: "The email and password combination is incorrect",
      });
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};
