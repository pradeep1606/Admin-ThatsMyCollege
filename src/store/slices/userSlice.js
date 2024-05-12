import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '@/config/AxiosIntercepter';

const Api = process.env.SERVICE_BASE_URL;

// Define the initial state
const initialState = {
    users: [],
    singleUser: [],
    status: 'idle', // for tracking loading status
    error: null, // for tracking errors
    status1: 'idle', // for tracking single user status
    error1: null // for tracking single user errors
};

// Define async thunk to fetch users data from the API
export const fetchAllusers = createAsyncThunk(
    'AllUsers/fetchAllusers',
    async () => {
        const response = await axiosInstance.get(`${Api}/users`, {
            headers: {
              'Content-Type': 'application/json'
            },
          });
        const data = await response.data.data;
        return data;
    }
);

// Define async thunk to fetch singleUser data from the API
export const fetchSingleUser = createAsyncThunk(
    'SingleUser/fetchSingleUser',
    async (userId) => {
        // console.log(userId)
        const response = await axiosInstance.get(`${Api}/users/${userId}`, {
            headers: {
              'Content-Type': 'application/json'
            },
          });
        const data = await response.data;
        return data;
    }
);

// Create a slice
export const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        // Reducers if needed
    },
    extraReducers: (builder) => {
        builder
            // Add reducers for the fetchAllusers async thunk
            .addCase(fetchAllusers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllusers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(fetchAllusers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Add reducers for the fetchSingleUser async thunk
            .addCase(fetchSingleUser.pending, (state) => {
                state.status1 = 'loading';
            })
            .addCase(fetchSingleUser.fulfilled, (state, action) => {
                state.status1 = 'succeeded';
                state.singleUser = action.payload;
            })
            .addCase(fetchSingleUser.rejected, (state, action) => {
                state.status1 = 'failed';
                state.error1 = action.error.message;
            })
    },
});

// Export action creators and reducer
export const { } = userSlice.actions;
export default userSlice.reducer;
