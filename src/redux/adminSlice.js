import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAdmin as loginAdminAPI } from "../config/Dataservice";

export const loginAdmin = createAsyncThunk(
  "admin/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await loginAdminAPI({ email, password });

      console.log(" ADMIN LOGIN RESPONSE:", response.data);

      // Combine token with admin object
      const data = {
        ...response.data.admin,
        token: response.data.token,
      };



      return data;
    } catch (error) {
      console.error(" ADMIN LOGIN ERROR:", error.response?.data || error.message);

      return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    adminInfo: null, // ❌ No localStorage here
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    logoutAdmin: (state) => {
      // ❌ No localStorage.removeItem here
      state.adminInfo = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.adminInfo = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const { logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
