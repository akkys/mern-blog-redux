import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT } from "../../store/types/UserTypes";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("myToken");
    dispatch({ type: LOGOUT });
  };
  const navLinks = user ? (
    <div className="navbar__right">
      <li>
        <Link to="/createBlog">Create</Link>
      </li>
      <li>
        <Link to="/dashboard/1">{user.name}</Link>
      </li>
      <li>
        <span onClick={logout}>Logout</span>
      </li>
    </div>
  ) : (
    <div className="navbar__right">
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
    </div>
  );

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar__row">
          <div className="navbar__left">
            <li>
              <Link to="/">Blogs</Link>
            </li>
          </div>
          {navLinks}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
