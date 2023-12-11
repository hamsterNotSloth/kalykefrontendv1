import { createSlice } from '@reduxjs/toolkit';
const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    filter: "New Uploads",
    category: null,
    searchBar: '',
    isFree: null,
    fileType: "All File Types"
  }, 
  reducers: {
    setFilter: (state, action) => action.payload,
    clearFilter: () => {
      return {
        filter: null,
        category: null,
        isFree: null,
        fileType: "All File Types"
      }
    },
  },
});

export const { setFilter, clearFilter } = filtersSlice.actions;

export default filtersSlice.reducer;
