import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginSeller as loginSellerAPI,
  registerSeller as registerSellerAPI,
} from "../config/Dataservice";

// Check localStorage for saved seller info
const savedSellerInfo = localStorage.getItem("sellerInfo");

// Async thunk for login
export const loginSeller = createAsyncThunk(
  "seller/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await loginSellerAPI({ email, password });
      return response.data; // { token, sellerData }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

// Async thunk for register
export const registerSeller = createAsyncThunk(
  "seller/register",
  async (sellerData, thunkAPI) => {
    try {
      const response = await registerSellerAPI(sellerData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

// Redux slice
const sellerSlice = createSlice({
  name: "seller",
  initialState: {
    sellerInfo: savedSellerInfo ? JSON.parse(savedSellerInfo) : null,
    isAuthenticated: !!savedSellerInfo,
    loading: false,
    error: null,
  },
  reducers: {
    logoutSeller: (state) => {
      state.sellerInfo = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("sellerInfo"); // ❌ Clear saved seller info
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.sellerInfo = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem("sellerInfo", JSON.stringify(action.payload)); // ✅ Save info
      })
      .addCase(loginSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })

      // REGISTER
      .addCase(registerSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerSeller.fulfilled, (state) => {
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
