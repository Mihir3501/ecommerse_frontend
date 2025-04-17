import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Assuming you're using axios for HTTP requests
import DataServices from '../config/Dataservice';
import { API } from '../config/Api';

const initialState = {
  token: null,
  user: null, // This will store seller info
  status: 'idle', // To track loading, success, and error states
  error: null, // To store any error messages
};

// Create an asynchronous thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (loginCredentials, { rejectWithValue }) => {
    try {
      // Replace with your login API request
      const response = await DataServices().post(API.USERLOGIN , loginCredentials ); // API endpoint

      

      return response.data; // Assuming the response contains a token and user data
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle errors
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'; // Set loading status while the login request is in progress
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Set succeeded when login is successful
        state.token = action.payload.token; // Assuming token is in the response data
        state.user = action.payload.user; // Assuming user data is in the response
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'; // Set failed status if the request fails
        state.error = action.payload; // Store error message
      });
  },
});

export const { setToken, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
