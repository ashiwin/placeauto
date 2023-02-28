import { createSlice } from '@reduxjs/toolkit';

const searchResultsSlice = createSlice({
  name: 'searchResults',
  initialState: [],
  reducers: {
    addSearchResult: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addSearchResult } = searchResultsSlice.actions;

export default searchResultsSlice.reducer;
