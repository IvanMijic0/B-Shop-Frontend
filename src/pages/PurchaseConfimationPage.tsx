// src/pages/PurchaseConfirmationPage.tsx
import React from 'react';
import { Typography, Box } from '@mui/material';

const PurchaseConfirmationPage = () => {
    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4">Thank You for Your Purchase!</Typography>
            <Typography>Your order is being processed and will be shipped to you soon.</Typography>
        </Box>
    );
};

export default PurchaseConfirmationPage;
