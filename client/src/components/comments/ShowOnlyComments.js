import React from "react";
import Comments from "./Comments";

const ShowOnlyComments = (props) => {
  const { addComment, comments } = props;
  return (
    <div>
      <div className="blog__details">
        <form onSubmit={addComment}>
          <div className="group">
            <label htmlFor="description" disabled>
              Comments
            </label>
            <span>
              Please <strong>Login</strong> to write comments.
            </span>
          </div>
        </form>
        <div>
          <Comments comments={comments} />
        </div>
      </div>
    </div>
  );
};

export default ShowOnlyComments;
