import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import appAxios from '../services/appAxios'

// In LoginPage and authSlice
import { LoginFormData } from '../utils/type';
import { RegistrationFormData } from '../utils/type';
// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
    ? localStorage.getItem('userToken')
    : null



const initialState = {
    loading: false,
    userInfo: null, // for user the object
    userToken, // for storing the JWT
    error: null,
    success: false, // for monitoring the registration process.
}


export const login = createAsyncThunk(
  'auth/login',
  async (data: LoginFormData, { rejectWithValue }) => {
      try {
        const response = await appAxios.post('/auth/login', {
            identifier: data.identifier,
            password: data.password
        });
        const { jwt_access_token, user } = response.data;  // Make sure the keys are correctly named
        localStorage.setItem('userToken', jwt_access_token); // Store the JWT in localStorage
        return { user, jwt: jwt_access_token };  
      } catch (error: any) {
          // return custom error message from backend if present
          if (error.response && error.response.data.message) {
              return rejectWithValue(error.response.data.message)
          } else {
              return rejectWithValue(error.message)
          }
      }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: RegistrationFormData, { rejectWithValue }) => {
      try {
          const response = await appAxios.post('/auth/register', data);
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

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('userToken') // deletes token from storage
            state.loading = false
            state.userInfo = null
            state.userToken = null
            state.error = null
        }
    },
    extraReducers: (builder) => {
        // Login user
        builder.addCase(login.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(login.fulfilled, (state, action: any) => {
            state.loading = false
            state.userInfo = action.payload.user
            state.userToken = action.payload.jwt
            state.error = null
        })
        builder.addCase(login.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload;
            state.userToken = null; // Ensure token is null if login fails
            state.userInfo = null; // Clear user info on failure
        });

         // Register user
         builder.addCase(registerUser.pending, (state) => {
          state.loading = true
          state.error = null
      })
      builder.addCase(registerUser.fulfilled, (state) => {
          state.loading = false
          state.success = true
      })
      builder.addCase(registerUser.rejected, (state, action: any) => {
          state.loading = false
          state.error = action.payload
      })
       
    }
})

// ...
export const { logout } = authSlice.actions
export default authSlice.reducer