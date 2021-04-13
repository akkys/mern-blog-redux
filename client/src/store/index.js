import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/AuthReducer";
import {
  blogReducer,
  fetchBlogs,
  fetchBlogById,
  updateBlog,
  updateImage,
} from "./reducers/BlogReducers";
import { updateName } from "./reducers/ProfileReducer";

const rootReducers = combineReducers({
  auth: authReducer,
  blog: blogReducer,
  fetchBlog: fetchBlogs,
  fetchById: fetchBlogById,
  update: updateBlog,
  updateImg: updateImage,
  name: updateName,
});

const middlewares = [thunk];

const Store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default Store;
