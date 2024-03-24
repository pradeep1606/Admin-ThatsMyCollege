// store.js
import { configureStore } from "@reduxjs/toolkit";
import collegeReducer from './slices/collegeSlice';
import singleCollegeReducer from './slices/singleCollegeSlice'
import userReducer from './slices/userSlice'
import searchCollegeReducer from "./slices/searchCollege";
import authReducer from "./slices/authSlice"
import courseReducer from "./slices/courseSlice"

export const store = configureStore({
    reducer: {
        AllCollege: collegeReducer,
        SingleCollege: singleCollegeReducer,
        User: userReducer,
        searchCollege: searchCollegeReducer,
        auth: authReducer,
        Course : courseReducer,
    }
});
