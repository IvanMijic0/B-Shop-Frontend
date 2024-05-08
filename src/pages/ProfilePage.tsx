// src/ProfilePage.js

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/authSlice';


const ProfilePage = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {user ? user.name : 'No User Logged In'}</p>
    </div>
  );
};

export default ProfilePage;
