import axios from "axios";
import {
  CREATE_ERROR,
  REMOVE_ERROR,
  SET_LOADER,
  CLOSE_LOADER,
  REDIRECT_TRUE,
  SET_MESSAGE,
  FETCH_BLOGS,
  FETCH_BLOG_BY_ID,
  FETCH_BLOG_DETAILS,
  BLOG_REQUEST,
  SET_UPDATE_ERROR,
  UPDATE_IMAGE_ERROR,
} from "../types/BlogTypes";

// const token = localStorage.getItem("myToken");
const createAction = (blogData) => {
  return async (dispatch, getState) => {
    const {
      auth: { token },
    } = getState();
    dispatch({ type: SET_LOADER });
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const {
        data: { msg },
      } = await axios.post("/blogs/create", blogData, config);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: REMOVE_ERROR });
      dispatch({ type: REDIRECT_TRUE });
      dispatch({ type: SET_MESSAGE, payload: msg });
    } catch (error) {
      console.log(error.response);
      const { errors } = error.response.data;
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: CREATE_ERROR, payload: errors });
    }
  };
};

const updateAction = (updateData) => {
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
        data: { msg },
      } = await axios.post("/blogs/update", updateData, config);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: REDIRECT_TRUE });
      dispatch({ type: SET_MESSAGE, payload: msg });
    } catch (error) {
      const {
        response: {
          data: { errors },
        },
      } = error;
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_UPDATE_ERROR, payload: errors });
      console.log(error.response);
    }
  };
};

const updateImageAction = (updateImg) => {
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
        data: { msg },
      } = await axios.post("/blogs/updateImage", updateImg, config);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: REDIRECT_TRUE });
      dispatch({ type: SET_MESSAGE, payload: msg });
    } catch (error) {
      const {
        response: {
          data: { errors },
        },
      } = error;
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: UPDATE_IMAGE_ERROR, payload: errors });
      console.log(error.response);
    }
  };
};

const fetchBlogs = (id, page) => {
  return async (dispatch, getState) => {
    const {
      auth: { token },
    } = getState();
    dispatch({ type: SET_LOADER });
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const {
        data: { response, count, perPage },
      } = await axios.get(`/blogs/get/${id}/${page}`, config);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: FETCH_BLOGS, payload: { response, count, perPage } });
      // console.log(response);
    } catch (error) {
      dispatch({ type: CLOSE_LOADER });
    }
  };
};

const fetchBlogById = (id) => {
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
        data: { blog },
      } = await axios.get(`/blogs/get/${id}`, config);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: FETCH_BLOG_BY_ID, payload: blog });
      dispatch({ type: BLOG_REQUEST });
    } catch (error) {
      dispatch({ type: CLOSE_LOADER });
      console.log(error.response);
    }
  };
};

const fetchAllBlogs = (page) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const {
        data: { response, count, perPage },
      } = await axios.get(`/blogs/getAll/${page}`);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: FETCH_BLOGS, payload: { response, count, perPage } });
    } catch (error) {
      dispatch({ type: CLOSE_LOADER });
      console.log(error);
    }
  };
};

const fetchBlogDetails = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const {
        data: { blog },
      } = await axios.get(`/blogs/blogDetails/${id}`);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: FETCH_BLOG_DETAILS, payload: blog });
    } catch (error) {
      dispatch({ type: CLOSE_LOADER });
      console.log(error);
    }
  };
};

export {
  createAction,
  updateAction,
  updateImageAction,
  fetchBlogs,
  fetchBlogById,
  fetchAllBlogs,
  fetchBlogDetails,
};
