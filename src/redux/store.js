import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './slices/searchSlice'
import moviesReducer from './slices/moviesSlice'

export const store = configureStore({
  reducer: {
    search: searchReducer,
    movies:moviesReducer
  }
});
