import { createSlice } from '@reduxjs/toolkit';
const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    filter: "New Uploads",
    category: null,
    searchBar: '',
    isFree: null,
    fileType: []
  }, 
  reducers: {
    setFilter: (state, action) => action.payload,
    clearFilter: () => {
      return {
        filter: null,
        category: null,
        isFree: null,
        fileType: []
      }
    },
  },
});

export const { setFilter, clearFilter } = filtersSlice.actions;

export default filtersSlice.reducer;
