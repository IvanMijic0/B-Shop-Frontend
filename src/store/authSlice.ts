import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { users, User } from '../users';

interface AuthState {
  user: User | null;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  error: null
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    const foundUser = users.find(user => user.email === email && user.password === password);
    if (!foundUser) {
      return rejectWithValue('Incorrect username or password');
    }
    return foundUser; 
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
        state.user = null;
        state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
      state.user = action.payload; 
      state.error = null;
    })
    .addCase(login.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload; 
    });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
