import React from "react";
import Comments from "./Comments";

const AddComment = (props) => {
  const { addComment, comment, setComment, comments } = props;
  return (
    <div>
      <div className="blog__details">
        <form onSubmit={addComment}>
          <div className="group">
            <label htmlFor="description">Comments</label>
            <textarea
              type="text"
              rows="2"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="group__control"
              placeholder="Write comment here... "
            />
          </div>
          <div className="group">
            <input
              type="submit"
              className="btn btn-default btn-block"
              value="Submit"
            />
          </div>
          <div>
            <Comments comments={comments} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddComment;
