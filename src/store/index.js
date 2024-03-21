// store.js
import { configureStore } from "@reduxjs/toolkit";
import collegeReducer from './slices/collegeSlice';
import singleCollegeReducer from './slices/singleCollegeSlice'
import userReducer from './slices/userSlice'
import searchCollegeReducer from "./slices/searchCollege";

export const store = configureStore({
    reducer: {
        AllCollege: collegeReducer,
        SingleCollege: singleCollegeReducer,
        User: userReducer,  
        searchCollege: searchCollegeReducer,
    }
});
