// src/pages/CheckoutPage.tsx
import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
    const [address, setAddress] = useState('');
    const [cardDetails, setCardDetails] = useState('');
    const navigate = useNavigate();

    const handlePurchase = () => {
        // Here, you would handle the payment process
        console.log("Purchase completed with:", { address, cardDetails });
        navigate('/purchase-confirmation'); // Navigate to a confirmation page
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h6">Checkout</Typography>
            <TextField
                label="Shipping Address"
                fullWidth
                variant="outlined"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                sx={{ my: 2 }}
            />
            <TextField
                label="Credit Card Details"
                fullWidth
                variant="outlined"
                value={cardDetails}
                onChange={(e) => setCardDetails(e.target.value)}
                sx={{ mb: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handlePurchase}>
                Complete Purchase
            </Button>
        </Box>
    );
};

export default CheckoutPage;
