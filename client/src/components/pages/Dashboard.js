import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
import { BsPencil, BsTrash, BsImage } from "react-icons/bs";
import {
  CLOSE_LOADER,
  REDIRECT_FALSE,
  REMOVE_MESSAGE,
  SET_LOADER,
  SET_MESSAGE,
} from "../../store/types/BlogTypes";
import { fetchBlogs } from "../../store/asyncActions/BlogActions";
import Loader from "../pages/Loader";
import Sidebar from "../layout/Sidebar";
import Pagination from "../pages/Pagination";
import axios from "axios";

const Dashboard = () => {
  const { redirect, message, loading } = useSelector((state) => state.blog);
  const {
    user: { _id, name },
    token,
  } = useSelector((state) => state.auth);
  const { blogs, count, perPage } = useSelector((state) => state.fetchBlog);
  let { page } = useParams();
  if (page === undefined) {
    page = 1;
  }
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = `${name}'s Dashboard | Blogs`;
    dispatch(fetchBlogs(_id, page));
  }, [page]);

  useEffect(() => {
    if (redirect) {
      dispatch({ type: REDIRECT_FALSE });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: REMOVE_MESSAGE });
    }
  }, [message]);

  const deleteBlog = async (id) => {
    const confirm = window.confirm("Are you want to delete this blog?");
    if (confirm) {
      dispatch({ type: SET_LOADER });
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const {
          data: { msg },
        } = await axios.get(`/blogs/delete/${id}`, config);
        dispatch(fetchBlogs(_id, page));
        dispatch({ type: SET_MESSAGE, payload: msg });
      } catch (error) {
        dispatch({ type: CLOSE_LOADER });
        console.log(error);
      }
    }
  };

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={true}
        toastOptions={{
          style: {
            color: "#fff",
            background: "#333",
            fontSize: "13px",
          },
        }}
      />
      <div className="container mt-100">
        <div className="row">
          <div className="col-3 p-15">
            <Sidebar />
          </div>
          <div className="col-9 p-15">
            {loading ? (
              <Loader />
            ) : blogs.length > 0 ? (
              blogs.map((blog) => (
                <div className="dashboard__blogs" key={blog._id}>
                  <div className="dashboard__blogs__title">
                    <Link to={`/blogDetails/${blog.blogUrl}`}>
                      {blog.title}
                    </Link>
                    <span>Published {moment(blog.updatedAt).fromNow()}</span>
                  </div>
                  <div className="dashboard__blogs__links">
                    <Link to={`/updateImage/${blog._id}`}>
                      <BsImage className="icon" />
                    </Link>
                    <Link to={`/updateBlog/${blog._id}`}>
                      <BsPencil className="icon" />
                    </Link>
                    <BsTrash
                      onClick={() => deleteBlog(blog._id)}
                      className="icon"
                    />
                  </div>
                </div>
              ))
            ) : (
              <h5>You don't have any blogs.</h5>
            )}
            <Pagination
              path="dashboard"
              page={page}
              count={count}
              perPage={perPage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
