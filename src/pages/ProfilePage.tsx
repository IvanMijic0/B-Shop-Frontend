import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Box, Divider, Grid, IconButton, Typography } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { RootState } from '../store';
import { updateAvatar } from '../store/profileSlice';

const ProfilePage = () => {
  const user = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(user.avatarUrl);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatar(result);
        dispatch(updateAvatar(result));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'start',
          backgroundColor: 'grey',
          padding: '20px',
          borderRadius: '5px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            cursor: 'pointer',
          }}
        >
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
            onChange={handleAvatarChange}
          />
          <label htmlFor="raised-button-file" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
            <Typography variant="body1" sx={{ ml: 1 }}>Change Avatar</Typography>
          </label>
        </Box>
        <Avatar
          alt={user.username ? user.username : 'Avatar'}
          src={avatar}
          sx={{ width: 56, height: 56, mt: 2 }}
        />
        <Typography sx={{padding: '10px'}}>Hello, {user.username ? user.username : 'No User Logged In'}! 👋</Typography>
      </Box>
      <Divider variant="middle" />
      <Grid container spacing={2}>
        <Grid item>
          <Typography>Profile Page</Typography>
          <Typography>This is a private page that can only be accessed by authenticated users.</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
