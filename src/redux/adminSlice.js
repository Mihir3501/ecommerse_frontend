import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAdmin as loginAdminAPI } from "../config/Dataservice";


export const loginAdmin = createAsyncThunk(
  "admin/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await loginAdminAPI({ email, password });
      localStorage.setItem("adminAuth", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

const adminSlice = createSlice({
  name: "admin", // ✅ updated to match store key
  initialState: {
    adminInfo: JSON.parse(localStorage.getItem("adminAuth")) || null,
    isAuthenticated: !!localStorage.getItem("adminAuth"),
    loading: false,
    error: null,
  },
  reducers: {
    logoutAdmin: (state) => {
      localStorage.removeItem("adminAuth");
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
