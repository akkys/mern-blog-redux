import jwt_decode from "jwt-decode";
import {
  SET_LOADER,
  CLOSE_LOADER,
  SET_TOKEN,
  REGISTER_ERRORS,
  LOGIN_ERRORS,
  LOGOUT,
} from "../types/UserTypes";

const initState = {
  loading: false,
  registerErrors: [],
  loginErrors: [],
  token: "",
  user: "",
};

const verifyToken = (token) => {
  const decodedToken = jwt_decode(token);
  const expiresIn = new Date(decodedToken.exp * 1000);
  if (new Date() > expiresIn) {
    localStorage.removeItem("myToken");
    return null;
  } else {
    return decodedToken;
  }
};

const token = localStorage.getItem("myToken");
if (token) {
  const decoded = verifyToken(token);
  if (decoded) {
    initState.token = token;
    const { user } = decoded;
    initState.user = user;
  }
}
// console.log(token );

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_LOADER: {
      return { ...state, loading: true };
    }
    case CLOSE_LOADER: {
      return { ...state, loading: false };
    }
    case REGISTER_ERRORS: {
      return { ...state, registerErrors: action.payload };
    }
    case LOGIN_ERRORS: {
      return { ...state, loginErrors: action.payload };
    }
    case SET_TOKEN: {
      const decoded = verifyToken(action.payload);
      const { user } = decoded;
      return {
        ...state,
        token: action.payload,
        user: user,
        loginErrors: [],
        registerErrors: [],
      };
    }
    case LOGOUT: {
      return { ...state, token: "", user: "" };
    }
    default: {
      return state;
    }
  }
};

export { authReducer };
