import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiCalls/apiSlice";
import filtersSlice from './slices/filtersSlice';
import productSlice from "./slices/productSlice";

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  product: productSlice, 
  filtersSlice:filtersSlice
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat( apiSlice.middleware),
});
