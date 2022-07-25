import { configureStore } from '@reduxjs/toolkit';
import isLoopReducer from '../redux/isLoopSlice'
import playingIdReducer from '../redux/playingIdSlice'

export const store = configureStore({
    reducer: {
        isLooper: isLoopReducer,
        playingId: playingIdReducer,
    },
});
