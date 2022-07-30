import { createSlice, Slice } from '@reduxjs/toolkit';
import { MusicResource } from '../types/musicResource';

export const soundsSlice: Slice = createSlice({
    name: 'sounds',
    initialState: {
        sounds: [],
    },
    reducers: {
        setSounds: (state: { sounds: MusicResource[] }, actions: { payload: MusicResource[] }) => {
            state.sounds = actions.payload;
        },
    },
});

export const { setSounds } = soundsSlice.actions;

export default soundsSlice.reducer;
