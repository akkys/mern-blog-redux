import {
  CREATE_ERROR,
  REMOVE_ERROR,
  SET_LOADER,
  CLOSE_LOADER,
  REDIRECT_FALSE,
  REDIRECT_TRUE,
  SET_MESSAGE,
  REMOVE_MESSAGE,
  FETCH_BLOGS,
  FETCH_BLOG_DETAILS,
  FETCH_BLOG_BY_ID,
  BLOG_REQUEST,
  BLOG_RESET,
  SET_UPDATE_ERROR,
  RESET_UPDATE_ERROR,
  UPDATE_IMAGE_ERROR,
  RESET_UPDATE_IMAGE_ERROR,
} from "../types/BlogTypes";

const initState = {
  loading: false,
  createErrors: [],
  redirect: false,
  message: "",
  blogs: [],
  count: "",
  perPage: "",
  blog: {},
  blogStatus: false,
  updateErrors: [],
  updateImageErrors: [],
  blogDetails: {},
};

const blogReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_LOADER: {
      return { ...state, loading: true };
    }
    case CLOSE_LOADER: {
      return { ...state, loading: false };
    }
    case CREATE_ERROR: {
      return { ...state, createErrors: payload };
    }
    case REMOVE_ERROR: {
      return { ...state, createErrors: [] };
    }
    case REDIRECT_TRUE: {
      return { ...state, redirect: true };
    }
    case REDIRECT_FALSE: {
      return { ...state, redirect: false };
    }
    case SET_MESSAGE: {
      return { ...state, message: payload };
    }
    case REMOVE_MESSAGE: {
      return { ...state, message: "" };
    }
    case FETCH_BLOG_DETAILS: {
      return { ...state, blogDetails: payload };
    }
    default: {
      return state;
    }
  }
};

const fetchBlogs = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_BLOGS: {
      return {
        ...state,
        blogs: payload.response,
        count: payload.count,
        perPage: payload.perPage,
      };
    }
    default: {
      return state;
    }
  }
};

const fetchBlogById = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_BLOG_BY_ID: {
      return {
        ...state,
        blog: payload,
      };
    }
    case BLOG_REQUEST: {
      return {
        ...state,
        blogStatus: true,
      };
    }
    case BLOG_RESET: {
      return {
        ...state,
        blogStatus: false,
      };
    }
    default: {
      return state;
    }
  }
};

const updateBlog = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_UPDATE_ERROR: {
      return {
        ...state,
        updateErrors: payload,
      };
    }
    case RESET_UPDATE_ERROR: {
      return {
        ...state,
        updateErrors: [],
      };
    }
    default: {
      return state;
    }
  }
};

const updateImage = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_IMAGE_ERROR: {
      return { ...state, updateImageErrors: payload };
    }
    case RESET_UPDATE_IMAGE_ERROR: {
      return { ...state, updateImageErrors: [] };
    }
    default: {
      return state;
    }
  }
};

export { blogReducer, updateBlog, updateImage, fetchBlogs, fetchBlogById };
