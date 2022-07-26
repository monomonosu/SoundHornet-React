import { createSlice } from '@reduxjs/toolkit';

export const volumeSlice = createSlice({
    name: 'volume',
    initialState: {
        volume: 0,
    },
    reducers: {
        setVolume: (state: { volume: number }, actions: { payload: number }) => {
            state.volume = actions.payload;
        },
    },
});

export const { setVolume } = volumeSlice.actions;

export default volumeSlice.reducer;
