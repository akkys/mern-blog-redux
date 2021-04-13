import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import toast, { Toaster } from "react-hot-toast";
import {
  fetchBlogById,
  updateAction,
} from "../../store/asyncActions/BlogActions";
import { BLOG_RESET, RESET_UPDATE_ERROR } from "../../store/types/BlogTypes";
import Loader from "../pages/Loader";

const UpdateBlog = (props) => {
  const { id } = useParams();
  const [value, setValue] = useState("");
  const [state, setState] = useState({
    title: "",
    description: "",
  });
  const dispatch = useDispatch();
  const { loading, redirect } = useSelector((state) => state.blog);
  const { blog, blogStatus } = useSelector((state) => state.fetchById);
  const { updateErrors } = useSelector((state) => state.update);

  useEffect(() => {
    document.title = "Update Blog | Blogs";

    if (blogStatus) {
      setState({
        title: blog.title,
        description: blog.description,
      });
      setValue(blog.value);
      dispatch({ type: BLOG_RESET });
    } else {
      dispatch(fetchBlogById(id));
    }
  }, [blog]);

  useEffect(() => {
    if (redirect) {
      props.history.push("/dashboard");
    }
    if (updateErrors.length !== 0) {
      updateErrors.map((err) => toast.error(err.msg));
      dispatch({ type: RESET_UPDATE_ERROR });
    }
  }, [updateErrors, redirect]);

  const updateBlog = (e) => {
    e.preventDefault();
    dispatch(
      updateAction({
        title: state.title,
        description: state.description,
        value,
        id: blog._id,
      })
    );
  };
  return loading ? (
    <Loader />
  ) : (
    <div className="container mt-100">
      <Toaster
        position="top-right"
        reverseOrder={true}
        toastOptions={{
          style: {
            color: "#fff",
            background: "#333",
            fontSize: "13px",
          },
        }}
      />
      <div className="row">
        <div className="col-6">
          <div className="card">
            <h3 className="card__h3">Update Blog</h3>
            <form onSubmit={updateBlog}>
              <div className="group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  value={state.title}
                  onChange={(e) =>
                    setState({ ...state, title: e.target.value })
                  }
                  className="group__control"
                  placeholder="Blog title..."
                />
              </div>
              <div className="group">
                <label htmlFor="body">Description</label>
                <ReactQuill
                  theme="snow"
                  id="body"
                  value={value}
                  onChange={setValue}
                  placeholder="Blog description..."
                />
              </div>
              <div className="group">
                <label htmlFor="description">Meta Description</label>
                <textarea
                  type="text"
                  id="description"
                  rows="4"
                  defaultValue={state.description}
                  onChange={(e) =>
                    setState({ ...state, description: e.target.value })
                  }
                  onKeyUp={(e) =>
                    setState({ ...state, description: e.target.value })
                  }
                  className="group__control"
                  placeholder="Meta description... "
                  maxLength="150"
                />
              </div>
              <p className="description_length">
                {state.description ? (
                  <>
                    {state.description.length} <span>/ 150</span>
                  </>
                ) : (
                  <>
                    {state.description.length} <span>/ 150</span>
                  </>
                )}
              </p>
              <div className="group">
                <input
                  type="submit"
                  className="btn btn-default btn-block"
                  value="Update"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;
