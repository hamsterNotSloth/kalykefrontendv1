import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiCalls/apiSlice";
import errorReducer from './slices/errorSlice';
import productSlice from "./slices/productSlice";
// import { productSlice } from "./apiCalls/productSlice";

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  product: productSlice, 
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat( apiSlice.middleware),
});
