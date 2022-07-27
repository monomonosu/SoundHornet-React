import { configureStore } from '@reduxjs/toolkit';
import isLoopReducer from '../redux/isLoopSlice'
import playingIdReducer from '../redux/playingIdSlice'
import volumeReducer from '../redux/volumeSlice';
import currentSeekReducer from '../redux/currentSeekSlice'
import currentSoundReducer from '../redux/currentSoundSlice'

export const store = configureStore({
    reducer: {
        isLooper: isLoopReducer,
        playingId: playingIdReducer,
        volume: volumeReducer,
        currentSeeker: currentSeekReducer,
        currentSounder: currentSoundReducer,
    },
});
