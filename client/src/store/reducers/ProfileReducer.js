import {
  RESET_PROFILE_ERRORS,
  SET_PROFILE_ERRORS,
} from "../types/ProfileTypes";

const initState = {
  updateNameError: [],
};

const updateName = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_PROFILE_ERRORS: {
      return { ...state, updateNameError: payload };
    }
    case RESET_PROFILE_ERRORS: {
      return { ...state, updateNameError: [] };
    }
    default: {
      return state;
    }
  }
};

export { updateName };
