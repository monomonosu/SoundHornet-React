import { createSlice, Slice } from '@reduxjs/toolkit';
import { MusicResource } from '../types/musicResource';

export const currentSoundSlice: Slice = createSlice({
    name: 'currentSound',
    initialState: {
        currentSound: { howl: undefined, id: undefined, filePath: undefined, musicName: undefined, group: undefined, music_photo: undefined },
    },
    reducers: {
        setCurrentSound: (state: { currentSound: MusicResource }, actions: { payload: MusicResource }) => {
            state.currentSound = actions.payload;
        },
    },
});

export const { setCurrentSound } = currentSoundSlice.actions;

export default currentSoundSlice.reducer;
