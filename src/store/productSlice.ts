import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import appAxios from '../services/appAxios';
import { Product, Category } from '../utils/type';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await appAxios.get<Product[]>('/products');
      return response.data;
    } catch (error: any | unknown) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await appAxios.get<Category[]>('/categories');
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

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialProductState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

const initialCategoryState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState: initialProductState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

const categorySlice = createSlice({
  name: 'categories',
  initialState: initialCategoryState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const productReducer = productSlice.reducer;
export const categoryReducer = categorySlice.reducer;
