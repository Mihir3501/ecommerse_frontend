import { loginAdmin } from "../config/Dataservice";
import { ADMIN_LOGIN_REQUEST, ADMIN_LOGIN_SUCCESS, ADMIN_LOGIN_FAIL } from "./constant/adminConstants";

export  const loginAdminAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_LOGIN_REQUEST });
    const response = await loginAdmin(data);
    console.log("Login Response:", response.data);

    dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: ADMIN_LOGIN_FAIL, payload: error.response?.data?.message || error.message });
  }
};

export default loginAdminAction