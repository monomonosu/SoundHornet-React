import { createSlice } from '@reduxjs/toolkit';

export const isLoopSlice = createSlice({
    name: 'isLoop',
    initialState: {
        isLoop: false,
    },
    reducers: {
        isLoopSetFalse: (state: { isLoop: boolean }) => {
            state.isLoop = false;
        },
        isLoopSetTrue: (state: { isLoop: boolean }) => {
            state.isLoop = true;
        },
    },
});

export const { isLoopSetFalse, isLoopSetTrue } = isLoopSlice.actions;

export default isLoopSlice.reducer;
