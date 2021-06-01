import moment from "moment";
import React from "react";

const Comments = ({ comments }) => {
  return comments.length > 0 ? (
    comments.map((comment) => (
      <div key={comment._id} className="commentSection">
        <div className="blog__header">
          <div className="blog__header__avatar">
            {comment.userName ? comment.userName[0] : ""}
          </div>
          <div className="blog__header__user">
            <span>{comment.userName}</span>
            <span
              style={{
                fontSize: "11px",
                color: "#666868",
              }}
            >
              {moment(comment.updatedAt).fromNow()}
            </span>
          </div>
        </div>
        <div className="comment__body">{comment.comment}</div>
      </div>
    ))
  ) : (
    <span>No Comments</span>
  );
};

export default Comments;
