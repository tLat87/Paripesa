import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    completedTasks: [],
};

const plannerSlice = createSlice({
    name: 'planner',
    initialState,
    reducers: {
        addCompletedTask: (state, action) => {
            state.completedTasks.push(action.payload);
        },
        removeTasks: (state, action) => {
            state.completedTasks = []
        },
    },
});

export const { addCompletedTask , removeTasks} = plannerSlice.actions;

export default plannerSlice.reducer;
