// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authReducer from './authSlice';
import cartReducer from './cartSlice';

const store = configureStore({
    reducer: {
      auth: authReducer,
      cart: cartReducer,
    },
  });

// Define RootState type which represents the state of the entire Redux store
export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch type which represents the dispatch function
export type AppDispatch = typeof store.dispatch;

// Custom hook for using the typed dispatch in your components
export const useAppDispatch: () => AppDispatch = () => useDispatch<AppDispatch>();

export default store;
