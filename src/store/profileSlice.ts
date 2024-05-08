import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface ProfileState {
  username: string;
  email: string;
  avatarUrl: string;
}


const initialState: ProfileState = {
  username: "Alice",
  email: "alice@example.com",
  avatarUrl: "/img/avatar.png", 
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<ProfileState>) => {
      return { ...state, ...action.payload };
    },

    updateAvatar: (state, action: PayloadAction<string>) => {
      state.avatarUrl = action.payload; 
    },

    updateUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload; 
    },
    updateEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    }
  },
});


export const { setProfile, updateAvatar, updateUsername, updateEmail } = profileSlice.actions;

export default profileSlice.reducer;
