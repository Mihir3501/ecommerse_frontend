import { loginAdmin } from "../config/Dataservice";
import {
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGOUT,
} from "./constant/adminConstants";

export const logoutAdminAction = () => (dispatch) => {
  localStorage.removeItem("adminAuth"); 
  dispatch({ type: ADMIN_LOGOUT });  
};

export const loginAdminAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_LOGIN_REQUEST });

    const response = await loginAdmin(data);
    console.log("Login Response:", response.data);

    if (response.data?.token) {
      localStorage.setItem("adminAuth", JSON.stringify(response.data));
      dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: response.data });
    } else {
      throw new Error("Invalid login response, token missing.");
    }
  } catch (error) {
    dispatch({
      type: ADMIN_LOGIN_FAIL,
      payload: error.response?.data?.message || "Login failed. Please try again."
    });
  }
};
