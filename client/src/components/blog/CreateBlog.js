import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import toast, { Toaster } from "react-hot-toast";
import { createAction } from "../../store/asyncActions/BlogActions";

const CreateBlog = (props) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [currentImage, setCurrentImage] = useState("Choose Image");
  const [imagePreview, setImagePreview] = useState("");
  const [value, setValue] = useState("");
  const [blogUrl, setBlogUrl] = useState("");
  const [blogUrlButton, setBlogUrlButton] = useState(false);

  const {
    user: { _id, name },
  } = useSelector((state) => state.auth);
  const { createErrors, redirect } = useSelector((state) => state.blog);

  useEffect(() => {
    document.title = "Create New Blog | Blogs";
    if (redirect) {
      props.history.push("/dashboard");
    }
    if (createErrors.length !== 0) {
      createErrors.map((err) => toast.error(err.msg));
    }
  }, [createErrors, redirect, props.history]);

  const handleBlogUrl = (e) => {
    setBlogUrlButton(true);
    setBlogUrl(e.target.value);
  };

  const updateURL = (e) => {
    e.preventDefault();
    setBlogUrl(blogUrl.trim().split(" ").join("_"));
  };

  const handleInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    const createBlogUrl = e.target.value
      .toLowerCase()
      .trim()
      .split(" ")
      .join("_");
    setBlogUrl(createBlogUrl);
  };

  const handleDescription = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleFile = (e) => {
    if (e.target.files.length !== 0) {
      setCurrentImage(e.target.files[0].name);
      setState({
        ...state,
        [e.target.name]: e.target.files[0],
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const createBlog = (e) => {
    e.preventDefault();
    const { title, image, description } = state;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);
    formData.append("value", value);
    formData.append("description", description);
    formData.append("blogUrl", blogUrl);
    formData.append("name", name);
    formData.append("id", _id);
    dispatch(createAction(formData));
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
      <form onSubmit={createBlog}>
        <div className="row">
          <div className="col-6 p-15">
            <div className="card">
              <h3 className="card__h3">Create New Blog</h3>
              <div className="group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={state.title}
                  onChange={handleInput}
                  className="group__control"
                  placeholder="Blog title..."
                />
              </div>
              <div className="group">
                <label htmlFor="image" className="image__label">
                  {currentImage}
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleFile}
                />
              </div>
              <div className="group">
                <label htmlFor="body">Description</label>
                <ReactQuill
                  theme="snow"
                  id="body"
                  value={value}
                  onChange={setValue}
                  placeholder="Blog descriptions..."
                />
              </div>
              <div className="group">
                <label htmlFor="description">Meta Description</label>
                <textarea
                  type="text"
                  name="description"
                  id="description"
                  rows="4"
                  defaultValue={state.description}
                  onChange={handleDescription}
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
            </div>
          </div>
          <div className="col-6 p-15">
            <div className="card">
              <div className="group">
                <label htmlFor="blogUrl">Blog URL</label>
                <input
                  type="text"
                  name="blogUrl"
                  id="slug"
                  value={blogUrl}
                  onChange={handleBlogUrl}
                  className="group__control"
                  placeholder="Blog URL... "
                />
              </div>
              <div className="group">
                {blogUrlButton ? (
                  <button className="btn btn-default" onClick={updateURL}>
                    Update URL
                  </button>
                ) : (
                  ""
                )}
              </div>

              <div className="group">
                <div className="image_preview">
                  {imagePreview ? (
                    <img src={imagePreview} alt={imagePreview} />
                  ) : (
                    <span className="preview">Preview Image</span>
                  )}
                </div>
              </div>
              <div className="group">
                <input
                  type="submit"
                  className="btn btn-default btn-block"
                  value="Create"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
