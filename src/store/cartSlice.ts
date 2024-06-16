import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import appAxios from '../services/appAxios';

interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

// Async thunk to create a cart
export const createCart = createAsyncThunk(
  'cart/createCart',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { cart: CartState };
      const response = await appAxios.post('/carts', { items: state.cart.items });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingIndex = state.items.findIndex(item => item.productId === action.payload.productId);
      if (existingIndex >= 0) {
        state.items[existingIndex].quantity += action.payload.quantity; 
      } else {
        state.items.push({ ...action.payload, price: Number(action.payload.price) });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex(item => item.productId === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCart.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
