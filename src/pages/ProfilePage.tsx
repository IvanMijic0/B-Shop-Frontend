import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Box, Button, IconButton, TextField, Typography, Snackbar, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { RootState } from '../store';
import { updateProfile, setProfile } from '../store/profileSlice';
import { getUserFromToken } from '../utils/getUserFromToken';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    const userToken = getUserFromToken();
    const { user } = userToken;
    console.log('user info', user);
    
    if (user) {
      dispatch(setProfile({
        username: user.username,
        email: user.email,
        // hardcoded part
        avatarUrl: '/img/avatar.png',
        bio: 'some bio text here',
        location: 'Somewhere, World',
        interests: 'Food, Music, Travel',
      }));
    }
  }, [dispatch]);

  const [editMode, setEditMode] = useState(false);
  const [bio, setBio] = useState(user.bio);
  const [location] = useState(user.location);
  const [interests, setInterests] = useState(user.interests);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSaveProfile = () => {
    dispatch(updateProfile({ bio, location, interests }));
    setOpenSnackbar(true);
    setEditMode(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
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
        <Avatar
          alt={user.username ? user.username : 'Avatar'}
          src={user.avatarUrl}
          sx={{ width: 56, height: 56, mt: 2 }}
        />
        <Typography sx={{ mt: 2 }}>Hello, {user.username ? user.username : 'No User Logged In'}! 👋</Typography>
        <Tooltip title="Edit Profile">
          <IconButton onClick={toggleEditMode}>
            {editMode ? <SaveIcon /> : <EditIcon />}
          </IconButton>
        </Tooltip>
      </Box>
      <Box
        sx={{
          mt: 2,
          backgroundColor: 'grey',
          padding: '20px',
          borderRadius: '5px',
        }}
      >
        {editMode ? (
          <>
            <TextField
              label="Bio"
              multiline
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
            />
            <TextField
              label="Interests"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              variant="outlined"
              fullWidth
              sx={{ mt: 2, mb: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handleSaveProfile}>
              Save Changes
            </Button>
          </>
        ) : (
          <>
            <Typography variant="body1" sx={{ mt: 2 }}><strong>Bio:</strong> {bio}</Typography>
            <Typography variant="body1" sx={{ mt: 2 }}><strong>Location:</strong> {location}</Typography>
            <Typography variant="body1" sx={{ mt: 2 }}><strong>Interests:</strong> {interests}</Typography>
          </>
        )}
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Profile updated successfully!"
        action={
          <Button color="inherit" size="small" onClick={handleCloseSnackbar}>
            Close
          </Button>
        }
      />
    </Box>
  );
};

export default ProfilePage;
