// Import necessary functions from Redux Toolkit
import axiosInstance from '@/config/AxiosIntercepter';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const Api = process.env.SERVICE_BASE_URL;

// Define the initial state for the authentication slice
const initialState = {
  status: 'idle',
  error: null,
  isAuthenticated: false,
  userProfile: null,
};

// Define an asynchronous thunk for token verification
export const verifyToken = createAsyncThunk(
  'auth/verifyToken',
  async (authToken) => {
    try {
      const response = await axiosInstance.post(
        `${Api}/auth/validate-token`,
        { token: authToken },
        {
          headers: {
            'Content-Type': 'application/json'
          },
        }
      );
      return response.data;
    } catch (error) {
      // console.error('Error validating token:', error);
      throw error;
    }
  }
);

// Create a slice for authentication
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.status = 'idle';
      state.error = null;
      state.userProfile = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(verifyToken.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.userProfile = action.payload;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.isAuthenticated = false;
        state.userProfile = null;
      });
  },
});

// Export actions and reducer
export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
