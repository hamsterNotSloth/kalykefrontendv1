import { createSlice } from '@reduxjs/toolkit';
const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    filter: null,
    category: null,
    searchBar: ''
  }, 
  reducers: {
    setFilter: (state, action) => action.payload,
    clearFilter: () => {
      return {
        filter: null,
        category: null
      }
    },
  },
});

export const { setFilter, clearFilter } = filtersSlice.actions;

export default filtersSlice.reducer;