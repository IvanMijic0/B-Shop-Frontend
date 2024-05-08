import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Box, Button, IconButton, TextField, Typography, Snackbar, Tooltip } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { RootState } from '../store';
import { updateAvatar, updateProfile } from '../store/profileSlice';

const ProfilePage = () => {
  const user = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [avatar, setAvatar] = useState(user.avatarUrl);
  const [bio, setBio] = useState(user.bio);
  const [location, setLocation] = useState(user.location);
  const [interests, setInterests] = useState(user.interests);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatar(result);
        dispatch(updateAvatar(result));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    dispatch(updateProfile({ bio, location, interests, avatarUrl: avatar }));
    setOpenSnackbar(true);
    setEditMode(false); // Exit edit mode on save
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
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: 'pointer' }}>
          <input
            accept="image/jpeg,image/png"
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
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
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

