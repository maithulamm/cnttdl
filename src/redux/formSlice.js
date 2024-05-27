import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
    name: 'form',
    initialState: {
        form_input: {
            currentForm: {},
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        form_inputStart: (state) => {
            state.form_input.isFetching = true;
        },
        form_inputSuccess: (state, action) => {
            state.form_input.isFetching = false;
            state.form_input.currentForm = action.payload;
            state.form_input.error = false;
        },
        form_inputFailure: (state) => {
            state.form_input.isFetching = false;
            state.form_input.error = true;
        },
        // Hành động mới để thêm dữ liệu vào state
        addFormData: (state, action) => {
            state.form_input.currentForm = {
                ...state.form_input.currentForm,
                ...action.payload,
            };
        },
        deleteFormData: (state) => {
            state.form_input.currentForm = {};
            state.form_input.isFetching = false;
        },
    },
});

export const { form_inputStart, form_inputSuccess, form_inputFailure, addFormData, deleteFormData } = formSlice.actions;

export default formSlice.reducer;
