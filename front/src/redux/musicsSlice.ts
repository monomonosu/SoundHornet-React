import { createSlice, Slice } from '@reduxjs/toolkit';
import { Music } from '../types/musics';

export const musicsSlice: Slice = createSlice({
    name: 'musics',
    initialState: {
        musics: [],
    },
    reducers: {
        setMusics: (state: { musics: Music[] }, actions: { payload: Music[] }) => {
            state.musics = actions.payload;
        },
    },
});

export const { setMusics } = musicsSlice.actions;

export default musicsSlice.reducer;
