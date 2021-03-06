import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import {
  blogComment,
  fetchBlogDetails,
} from "../../store/asyncActions/BlogActions";
import Loader from "../pages/Loader";
import { htmlToText } from "html-to-text";
import AddComment from "../comments/AddComment";
import ShowOnlyComments from "../comments/ShowOnlyComments";

const BlogDetails = () => {
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { loading, blogDetails, comments } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  console.log(blogDetails);

  useEffect(() => {
    document.title = `${blogDetails.title} | Blogs`;
  });

  const addComment = (e) => {
    e.preventDefault();
    dispatch(
      blogComment({ id: blogDetails._id, comment, userName: user.name })
    );
    setComment("");
    dispatch(fetchBlogDetails(id));
  };

  useEffect(() => {
    dispatch(fetchBlogDetails(id));
  }, [id, dispatch]);

  return (
    <div className="container">
      <div className="row mt-100">
        <div className="col-8 p-15">
          {loading ? (
            <Loader />
          ) : (
            <div className="blog__details">
              <div className="blog__header">
                <div className="blog__header__avatar">
                  {blogDetails.userName ? blogDetails.userName[0] : ""}
                </div>
                <div className="blog__header__user">
                  <span>{blogDetails.userName}</span>
                  <span>
                    Posted on : {moment(blogDetails.updatedAt).format("ll")}
                  </span>
                </div>
              </div>
              <div className="blog__body">
                <h1 className="blog__body__title">{blogDetails.title}</h1>
                <div className="blog__body__image">
                  <img
                    src={`/images/${blogDetails.image}`}
                    alt={blogDetails.image}
                  />
                </div>
                <div className="blog__body__details">
                  {htmlToText(blogDetails.value)}
                </div>
              </div>
            </div>
          )}
        </div>
        {user ? (
          <div className="col-4 p-15">
            <AddComment
              addComment={addComment}
              comment={comment}
              setComment={setComment}
              comments={comments}
            />
          </div>
        ) : (
          <div className="col-4 p-15">
            <ShowOnlyComments addComment={addComment} comments={comments} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
