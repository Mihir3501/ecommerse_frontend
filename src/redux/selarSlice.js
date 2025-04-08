import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginSeller as loginSellerAPI,
  registerSeller as registerSellerAPI,
} from "../config/Dataservice";
 
export const loginSeller = createAsyncThunk(
  "seller/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await loginSellerAPI({ email, password });
      localStorage.setItem("sellerAuth", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);
 
export const registerSeller = createAsyncThunk(
  "seller/register",
  async (sellerData, thunkAPI) => {
    try {
      const response = await registerSellerAPI(sellerData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);
 
const sellerSlice = createSlice({
  name: "seller",
  initialState: {
    sellerInfo: JSON.parse(localStorage.getItem("sellerAuth")) || null,
    isAuthenticated: !!localStorage.getItem("sellerAuth"),
    loading: false,
    error: null,
  },
  reducers: {
    logoutSeller: (state) => {
      localStorage.removeItem("sellerAuth");
      state.sellerInfo = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(loginSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.sellerInfo = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
 
      // register
      .addCase(registerSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerSeller.fulfilled, (state, action) => {
        state.loading = false;

      })
      .addCase(registerSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
 
export const { logoutSeller } = sellerSlice.actions;
export default sellerSlice.reducer;