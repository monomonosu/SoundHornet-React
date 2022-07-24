import { configureStore } from '@reduxjs/toolkit';
import isLoopReducer from '../redux/isLoopSlice'

export const store = configureStore({
    reducer: {
        isLooper: isLoopReducer,
    },
});
