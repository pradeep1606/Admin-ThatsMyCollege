import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '@/config/AxiosIntercepter';

const Api = process.env.SERVICE_BASE_URL;

// Define the initial state
const initialState = {
    colleges: [],
    page: 1,
    status: 'idle', // for tracking loading status
    error: null, // for tracking errors
    deleteStatus: 'idle', // for tracking delete operation status
    deleteError: null // for tracking delete operation errors
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

// Define an async thunk to delete a college from the API
export const deleteCollege = createAsyncThunk(
    'AllCollege/deleteCollege',
    async (collegeId) => {
        const response = await axiosInstance.delete(`${Api}/college/${collegeId}`, {
            headers: {
              'Content-Type': 'application/json'
            },
          });
        const data = await response.data;
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
        setPage:(state, action)=>{
            state.page = action.payload;
        }
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
            })
            // Add reducers for the deleteCollege async thunk
            .addCase(deleteCollege.pending, (state) => {
                state.deleteStatus = 'loading';
            })
            .addCase(deleteCollege.fulfilled, (state) => {
                state.deleteStatus = 'succeeded';
                // You may want to update the state accordingly after deleting the college
            })
            .addCase(deleteCollege.rejected, (state, action) => {
                state.deleteStatus = 'failed';
                state.deleteError = action.error.message;
            });
    },
});

// Export action creators and reducer
export const { setStatus, setPage } = collegeSlice.actions;
export default collegeSlice.reducer;
