import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    savedQuotes: [],
};

const quoteSlice = createSlice({
    name: 'quote',
    initialState,
    reducers: {
        saveQuote: (state, action) => {
            state.savedQuotes.push(action.payload);
        },
        clearQuotes: (state) => {
            state.savedQuotes = [];
        },
    },
});

export const { saveQuote, clearQuotes } = quoteSlice.actions;

export default quoteSlice.reducer;
