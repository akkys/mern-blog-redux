import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { updatePasswordAction } from "../../store/asyncActions/ProfileAction";
import { RESET_PROFILE_ERRORS } from "../../store/types/ProfileTypes";
import Loader from "../pages/Loader";
import Sidebar from "../layout/Sidebar";

const UpdatePassword = (props) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    currentPassword: "",
    newPassword: "",
    userId: null,
  });
  const { loading, redirect } = useSelector((state) => state.blog);
  const { updateNameError } = useSelector((state) => state.name);
  const {
    user: { _id },
  } = useSelector((state) => state.auth);

  useEffect(() => {
    document.title = `Update Password | Blogs`;
  }, []);

  useEffect(() => {
    if (redirect) {
      props.history.push("/dashboard");
    }
  }, [redirect]);

  useEffect(() => {
    if (updateNameError.length !== 0) {
      updateNameError.map((err) => toast.error(err.msg));
      dispatch({ type: RESET_PROFILE_ERRORS });
    }
  }, [updateNameError]);

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    dispatch(
      updatePasswordAction({
        currentPassword: state.currentPassword,
        newPassword: state.newPassword,
        userId: _id,
      })
    );
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
            <h3 className="card__h3">Update Password</h3>
            <form onSubmit={handleUpdatePassword}>
              <div className="group">
                <input
                  type="password"
                  value={state.currentPassword}
                  onChange={(e) =>
                    setState({ ...state, currentPassword: e.target.value })
                  }
                  className="group__control"
                  placeholder="Current password..."
                />
              </div>
              <div className="group">
                <input
                  type="password"
                  value={state.newPassword}
                  onChange={(e) =>
                    setState({ ...state, newPassword: e.target.value })
                  }
                  className="group__control"
                  placeholder="New password..."
                />
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

export default UpdatePassword;
