import { createSlice } from '@reduxjs/toolkit';

export const isLoopSlice = createSlice({
    name: 'isLoop',
    initialState: {
        isLoop: false,
    },
    reducers: {
        isLoopSetFalse: (state) => {
            state.isLoop = false;
        },
        isLoopSetTrue: (state) => {
            state.isLoop = true;
        },
    },
});

export const { isLoopSetFalse, isLoopSetTrue } = isLoopSlice.actions;

export default isLoopSlice.reducer;
