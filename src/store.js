import { configureStore } from '@reduxjs/toolkit';
import allProductsReducer from './Features/AllItemSlice';

export const store = configureStore({
  reducer: {
    allProducts: allProductsReducer,
  },
});
