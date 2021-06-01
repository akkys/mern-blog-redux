import React from "react";
import moment from "moment";
import { BsPencil, BsTrash, BsImage } from "react-icons/bs";
import { Link } from "react-router-dom";

const DashboardContent = ({ blog, deleteBlog }) => {
  return (
    <div>
      <div className="dashboard__blogs" key={blog._id}>
        <div className="dashboard__blogs__title">
          <Link to={`/blogDetails/${blog.blogUrl}`}>{blog.title}</Link>
          <span>Published {moment(blog.updatedAt).fromNow()}</span>
        </div>
        <div className="dashboard__blogs__links">
          <Link to={`/updateImage/${blog._id}`}>
            <BsImage className="icon" />
          </Link>
          <Link to={`/updateBlog/${blog._id}`}>
            <BsPencil className="icon" />
          </Link>
          <BsTrash onClick={() => deleteBlog(blog._id)} className="icon" />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
