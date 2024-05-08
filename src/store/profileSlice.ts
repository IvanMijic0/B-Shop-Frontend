import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface ProfileState {
  username: string;
  email: string;
  avatarUrl: string;
  bio: string;
  location: string;
  interests: string;
}


const initialState: ProfileState = {
  username: "Alice",
  email: "alice@example.com",
  avatarUrl: "/img/avatar.png", 
  bio: "some bio text here",
  location: "Somewhere, World",
  interests: "Food, Music, Travel",
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
    },
    updateProfile: (state, action: PayloadAction<Partial<ProfileState>>) => {
      return { ...state, ...action.payload };
    },
  },
});


export const { setProfile, updateAvatar, updateUsername, updateEmail, updateProfile } = profileSlice.actions;

export default profileSlice.reducer;
