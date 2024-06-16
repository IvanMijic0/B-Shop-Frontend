// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authReducer from './authSlice';
import cartReducer from './cartSlice';
import profileReducer from './profileSlice';
import { productReducer, categoryReducer } from './productSlice';

const store = configureStore({
    reducer: {
      auth: authReducer,
      cart: cartReducer,
      profile: profileReducer,
      products: productReducer,
      categories: categoryReducer,
    },
  });

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = () => useDispatch<AppDispatch>();

export default store;
