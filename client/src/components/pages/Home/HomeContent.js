import React from "react";
import moment from "moment";
import { htmlToText } from "html-to-text";
import { Link } from "react-router-dom";

const HomeContent = ({ blog }) => {
  return (
    <div>
      <div className="row blog-style" key={blog._id}>
        <div className="col-8 ">
          <div className="blog">
            <div className="blog__header">
              <div className="blog__header__avatar">{blog.userName[0]}</div>
              <div className="blog__header__user">
                <span>{blog.userName}</span>
                <span>Posted on : {moment(blog.updatedAt).format("ll")}</span>
              </div>
            </div>
            <div className="blog__body">
              <h1 className="blog__body__title">
                <Link to={`/blogDetails/${blog.blogUrl}`}>{blog.title}</Link>
              </h1>
              <div className="blog__body__details">
                {htmlToText(blog.value.slice(0, 300))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="blog__image">
            <img src={`/images/${blog.image}`} alt={blog.image} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
