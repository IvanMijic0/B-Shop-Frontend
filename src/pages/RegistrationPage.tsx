import React, { useEffect, useState } from 'react';
import { useAppDispatch, RootState } from '../store';
import { registerUser } from '../store/authSlice';
import { useSelector } from 'react-redux';
import { RegistrationFormData } from '../utils/type';
import { Button, TextField, Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
    const [formData, setFormData] = useState<RegistrationFormData>({
        fullName: '',
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
    });
    const dispatch = useAppDispatch();
    const { error, loading, success } = useSelector((state: RootState) => state.auth);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const navigate = useNavigate();
useEffect(() => {
    if (success) {
        // Optionally reset form here or give a message to the user
        navigate('/login'); // Redirect to login page
    }
}, [success, navigate]);


    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(registerUser(formData));
    };

    return (
        <Container component="main" maxWidth="sm">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="fullName"
                        label="Full Name"
                        name="fullName"
                        autoComplete="fullName"
                        autoFocus
                        value={formData.fullName}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="phoneNumber"
                        label="Phone Number"
                        type="phoneNumber"
                        id="phoneNumber"
                        autoComplete="current-phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        Register
                    </Button>
                    {error && (
                        <Typography color="error" variant="body2">
                            {error}
                        </Typography>
                    )}
                    {success && (
                        <Typography color="primary" variant="body2">
                            Registration successful! Please log in.
                        </Typography>
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export default RegistrationPage;
