// src/store/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingIndex = state.items.findIndex(item => item.productId === action.payload.productId);
      
      if (existingIndex >= 0) {
        state.items[existingIndex].quantity += 1; 
      } else {
        state.items.push({ ...action.payload, quantity: 1 }); 
      }
    },
    // Additional reducers can be defined here for other functionalities like removeItem, clearCart, etc.
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
