import { createSlice, Slice } from '@reduxjs/toolkit';

export const isLoopSlice: Slice = createSlice({
    name: 'isLoop',
    initialState: {
        isLoop: false,
    },
    reducers: {
        setIsLoop: (state: { isLoop: boolean }, actions: { payload: boolean }) => {
            state.isLoop = actions.payload;
        },
    },
});

export const { setIsLoop } = isLoopSlice.actions;

export default isLoopSlice.reducer;
