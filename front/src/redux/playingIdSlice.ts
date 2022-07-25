import { createSlice } from '@reduxjs/toolkit';

export const playingIdSlice = createSlice({
    name: 'playingId',
    initialState: {
        playingId: undefined,
    },
    reducers: {
        setPlayingId: (state: { playingId: number | undefined }, actions: { payload: number }) => {
            state.playingId = actions.payload;
        },
    },
});

export const { setPlayingId } = playingIdSlice.actions;

export default playingIdSlice.reducer;