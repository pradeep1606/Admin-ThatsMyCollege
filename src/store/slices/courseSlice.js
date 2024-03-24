// searchCollegeSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/config/AxiosIntercepter";

const Api = process.env.SERVICE_BASE_URL;

export const fetchCourse = createAsyncThunk(
    "Course/fetchCourse",
    async (apiPost) => {
        try {
            const response = await axiosInstance.get(`${Api}${apiPost}`);
            return response.data;
        } catch (error) {
            return error;
        }
    }
);

export const courseSlice = createSlice({
    name: "Course",
    initialState: {
        courses: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourse.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCourse.fulfilled, (state, action) => {
                state.loading = false;
                state.courses = action.payload;
            })
            .addCase(fetchCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

// Export action creators and reducer
export const {} = courseSlice.actions;
export default courseSlice.reducer;
