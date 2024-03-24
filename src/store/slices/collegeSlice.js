import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '@/config/AxiosIntercepter';

const Api = process.env.SERVICE_BASE_URL;

// Define the initial state
const initialState = {
    colleges: [],
    status: 'idle', // for tracking loading status
    error: null // for tracking errors
};

// Define an async thunk to fetch colleges data from the API
export const fetchColleges = createAsyncThunk(
    'AllCollege/fetchColleges',
    async (page) => {
        const response = await axiosInstance.get(`${Api}/college?limit=20&page=${page}`, {
            headers: {
              'Content-Type': 'application/json'
            },
          });
        const data = await response.data.data;
        return data;
    }
);

// Create a slice
export const collegeSlice = createSlice({
    name: 'AllCollege',
    initialState,
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Add reducers for the fetchColleges async thunk
            .addCase(fetchColleges.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchColleges.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.colleges = action.payload;
            })
            .addCase(fetchColleges.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

// Export action creators and reducer
export const { setStatus } = collegeSlice.actions;
export default collegeSlice.reducer;
