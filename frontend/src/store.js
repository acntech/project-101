import { configureStore } from "@reduxjs/toolkit";

import employeesReducer from './features/employeeSlice';

export const store = configureStore({
    reducer: {
        employees: employeesReducer
    }
});