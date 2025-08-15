import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: ''
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    // NEW: Add a reducer to clear the search query
    clearQuery: (state) => {
      state.query = '';
    }
  }
});

// Export the generated action creators
export const { setQuery, clearQuery } = searchSlice.actions; // Now exporting clearQuery
export default searchSlice.reducer;
