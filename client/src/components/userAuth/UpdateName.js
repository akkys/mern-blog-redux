import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { updateNameAction } from "../../store/asyncActions/ProfileAction";
import Sidebar from "../layout/Sidebar";
import { RESET_PROFILE_ERRORS } from "../../store/types/ProfileTypes";
import Loader from "../pages/Loader";

const UpdateName = (props) => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const {
    user: { _id, name },
  } = useSelector((state) => state.auth);
  const { loading, redirect } = useSelector((state) => state.blog);
  const { updateNameError } = useSelector((state) => state.name);

  useEffect(() => {
    document.title = `Update Name | Blogs`;
    setUserName(name);
  }, []);

  useEffect(() => {
    if (redirect) {
      props.history.push("/dashboard");
    }
    if (updateNameError.length !== 0) {
      updateNameError.map((err) => toast.error(err.msg));
      dispatch({ type: RESET_PROFILE_ERRORS });
    }
  }, [redirect, updateNameError]);

  const handleUpdateName = (e) => {
    e.preventDefault();
    dispatch(updateNameAction({ name: userName, id: _id }));
  };

  return loading ? (
    <Loader />
  ) : (
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
        <div className="col-3 p-15">
          <Sidebar />
        </div>
        <div className="col-6 p-15">
          <div className="card">
            <h3 className="card__h3">Update Name</h3>
            <form onSubmit={handleUpdateName}>
              <div className="group">
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="group__control"
                  placeholder="Name..."
                />
              </div>
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

export default UpdateName;
