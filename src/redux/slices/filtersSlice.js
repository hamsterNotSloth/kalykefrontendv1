import { createSlice } from '@reduxjs/toolkit';
const filtersSlice = createSlice({
  name: 'filters',
  initialState: null, 
  reducers: {
    setFilter: (state, action) => action.payload,
    clearFilter: () => null,
  },
});

export const { setFilter, clearFilter } = filtersSlice.actions;

export default filtersSlice.reducer;