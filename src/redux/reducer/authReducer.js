import { ADMIN_LOGIN_REQUEST, ADMIN_LOGIN_SUCCESS, ADMIN_LOGIN_FAIL } from "../constant/adminConstants";

const initialState = {
  loading: false,
  isAuthenticated: false, 
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_REQUEST:
      return { ...state, loading: true, error: null };

    case ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true, 
        user: action.payload,
        error: null,
      };

    case ADMIN_LOGIN_FAIL:
      return { ...state, loading: false, isAuthenticated: false, error: action.payload };

    default:
      return state;
  }
};

export default authReducer;
