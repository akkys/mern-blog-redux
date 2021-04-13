import axios from "axios";
import {
  CLOSE_LOADER,
  REDIRECT_TRUE,
  SET_LOADER,
  SET_MESSAGE,
} from "../types/BlogTypes";
import { SET_PROFILE_ERRORS } from "../types/ProfileTypes";
import { SET_TOKEN } from "../types/UserTypes";

const updateNameAction = (user) => {
  return async (dispatch, getState) => {
    const {
      auth: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({ type: SET_LOADER });
    try {
      const {
        data: { msg, token },
      } = await axios.post("/profile/updateName", user, config);
      dispatch({ type: CLOSE_LOADER });
      localStorage.setItem("myToken", token);
      dispatch({ type: SET_TOKEN, payload: token });
      dispatch({ type: SET_MESSAGE, payload: msg });
      dispatch({ type: REDIRECT_TRUE });
    } catch (error) {
      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: SET_PROFILE_ERRORS,
        payload: error.response.data.errors,
      });
    }
  };
};

const updatePasswordAction = (userData) => {
  return async (dispatch, getState) => {
    const {
      auth: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({ type: SET_LOADER });
    try {
      const { data } = await axios.post(
        "/profile/updatePassword",
        userData,
        config
      );
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_MESSAGE, payload: data.msg });
      dispatch({ type: REDIRECT_TRUE });
    } catch (error) {
      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: SET_PROFILE_ERRORS,
        payload: error.response.data.errors,
      });
    }
  };
};

export { updateNameAction, updatePasswordAction };
