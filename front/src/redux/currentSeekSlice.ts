import { createSlice } from '@reduxjs/toolkit';

export const currentSeekSlice = createSlice({
    name: 'currentSeek',
    initialState: {
        currentSeek: 0,
    },
    reducers: {
        setCurrentSeek: (state: { currentSeek: number }, actions: { payload: number }) => {
            state.currentSeek = actions.payload;
        },
    },
});

export const { setCurrentSeek } = currentSeekSlice.actions;

export default currentSeekSlice.reducer;
