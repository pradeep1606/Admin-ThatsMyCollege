import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '@/config/AxiosIntercepter';

const Api = process.env.SERVICE_BASE_URL;

// Define the initial state
const initialState = {
    college: [],
    status: 'idle', // for tracking loading status
    error: null // for tracking errors
};

// Define async thunk to fetch college data from the API
export const fetchSingleColleges = createAsyncThunk(
    'SingleCollege/fetchSingleColleges',
    async (collegeId) => {
        const response = await axiosInstance.get(`${Api}/college/details/${collegeId}`, {
            headers: {
              'Content-Type': 'application/json'
            },
          });
        const data = await response.data;
        return data;
    }
);

// Create a slice
export const singleCollegeSlice = createSlice({
    name: 'College',
    initialState,
    reducers: {
        // Reducers if needed
    },
    extraReducers: (builder) => {
        builder
            // Add reducers for the fetchSingleColleges async thunk
            .addCase(fetchSingleColleges.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSingleColleges.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.college = action.payload;
            })
            .addCase(fetchSingleColleges.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

// Export action creators and reducer
export const { } = singleCollegeSlice.actions;
export default singleCollegeSlice.reducer;
