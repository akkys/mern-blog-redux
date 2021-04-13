import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { updateImageAction } from "../../store/asyncActions/BlogActions";
import { RESET_UPDATE_IMAGE_ERROR } from "../../store/types/BlogTypes";

const UpdateImage = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    image: "",
    imagePreview: "",
    imageName: "Choose Image",
  });
  const { redirect } = useSelector((state) => state.blog);
  const { updateImageErrors } = useSelector((state) => state.updateImg);

  useEffect(() => {
    document.title = "Update Blog Image | Blogs";
    if (redirect) {
      props.history.push("/dashboard");
    }
    if (updateImageErrors.length !== 0) {
      updateImageErrors.map((imgError) => toast.error(imgError.msg));
      dispatch({ type: RESET_UPDATE_IMAGE_ERROR });
    }
  }, [updateImageErrors, redirect]);

  const handleFile = (e) => {
    if (e.target.files.length !== 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setState({
          ...state,
          imagePreview: reader.result,
          image: e.target.files[0],
          imageName: e.target.files[0].name,
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleUpdateImage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("image", state.image);
    dispatch(updateImageAction(formData));
  };
  return (
    <div className="container mt-100">
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
      <div className="row">
        <div className="col-6">
          <div className="card">
            <h3 className="card__h3">Update Blog Image</h3>
            <form onSubmit={handleUpdateImage}>
              <div className="group">
                <label htmlFor="image" className="image__label">
                  {state.imageName}
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleFile}
                />
              </div>
              <div className="group">
                <div className="image_preview">
                  {state.imagePreview ? (
                    <img src={state.imagePreview} alt={state.imagePreview} />
                  ) : (
                    <span className="preview">Preview Image</span>
                  )}
                </div>
              </div>{" "}
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

export default UpdateImage;
