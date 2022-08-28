import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import EmployeesApi from "../services/EmployeesApi";

const initialState = {
    employees: []
};

export const readAllEmployees = createAsyncThunk(
    'employees/readAllEmployees',
    async () => {
        const response = await EmployeesApi.readAllEmployees();
        return response;
    }
)

export const employeeSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        clearEmployeeList: () => {
            return initialState.employees;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(readAllEmployees.fulfilled, (state, action) => {
            return action.payload;
        })
    }
});

export const { clearEmployeeList } = employeeSlice.actions;
export default employeeSlice.reducer;