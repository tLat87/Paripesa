import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    moodHistory: '',
};

const moodSlice = createSlice({
    name: 'mood',
    initialState,
    reducers: {
        addMood: (state, action) => {
            state.moodHistory = action.payload;
        },
        clearMoods: (state) => {
            state.moodHistory = [];
        },
    },
});

export const { addMood, clearMoods } = moodSlice.actions;
export default moodSlice.reducer;
