import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { postRegister } from "../../store/asyncActions/AuthActions";
import BgImage from "./BgImage";

const Register = (props) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { loading, registerErrors } = useSelector((state) => state.auth);

  const handleInputs = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const userRegister = (e) => {
    e.preventDefault();
    dispatch(postRegister(state));
  };

  useEffect(() => {
    document.title = "User | Register";
    if (registerErrors.length > 0) {
      registerErrors.map((error) => toast.error(error.msg));
    }
  }, [registerErrors]);

  return (
    <>
      <div className="row mt-80">
        <div className="col-8">
          <BgImage />
          <Toaster
            position="top-right"
            reverseOrder={true}
            toastOptions={{
              style: {
                color: "#fff",
                background: "#333",
                fontSize: "13px",
              },
            }}
          />
        </div>
        <div className="col-4">
          <div className="account">
            <div className="account__section">
              <form onSubmit={userRegister}>
                <div className="group">
                  <h3 className="form-heading">Register</h3>
                </div>
                <div className="group">
                  <input
                    type="text"
                    name="name"
                    value={state.name}
                    className="group__control"
                    placeholder="Enter Name"
                    onChange={handleInputs}
                  />
                </div>
                <div className="group">
                  <input
                    type="email"
                    name="email"
                    value={state.email}
                    className="group__control"
                    placeholder="Enter Email"
                    onChange={handleInputs}
                  />
                </div>
                <div className="group">
                  <input
                    type="password"
                    name="password"
                    value={state.password}
                    className="group__control"
                    placeholder="Create Password"
                    onChange={handleInputs}
                  />
                </div>
                <div className="group">
                  <input
                    type="submit"
                    className="btn btn-default btn-block"
                    value={loading ? "Loading..." : "Register"}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
