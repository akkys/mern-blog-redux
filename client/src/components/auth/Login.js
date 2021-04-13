import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { postLogin } from "../../store/asyncActions/AuthActions";
import BgImage from "./BgImage";

const Login = () => {
  const dispatch = useDispatch();
  const { loginErrors, loading } = useSelector((state) => state.auth);
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleInputs = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    document.title = "User | Login";
    if (loginErrors.length > 0) {
      loginErrors.map((error) => toast.error(error.msg));
    }
  }, [loginErrors]);

  const userLogin = (e) => {
    e.preventDefault();
    dispatch(postLogin(state));
  };

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
              <form onSubmit={userLogin}>
                <div className="group">
                  <h3 className="form-heading">Login</h3>
                </div>
                <div className="group">
                  <input
                    type="email"
                    name="email"
                    value={state.email}
                    onChange={handleInputs}
                    className="group__control"
                    placeholder="Enter Email"
                  />
                </div>
                <div className="group">
                  <input
                    type="password"
                    name="password"
                    value={state.password}
                    onChange={handleInputs}
                    className="group__control"
                    placeholder="Create Password"
                  />
                </div>
                <div className="group">
                  <input
                    type="submit"
                    className="btn btn-default btn-block"
                    value={loading ? "Loading..." : "Login"}
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

export default Login;
