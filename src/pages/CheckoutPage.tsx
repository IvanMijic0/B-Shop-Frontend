import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import {
    Button, TextField, Typography, Box, Grid, List, ListItem, ListItemText,
    Stepper, Step, StepLabel, Divider,
    Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../store/cartSlice';

const steps = ['Shipping Address', 'Payment Details', 'Review Your Order'];

const CheckoutPage = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [shippingDetails, setShippingDetails] = useState({
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        country: ''
    });
    const [paymentDetails, setPaymentDetails] = useState({
        cardHolder: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            console.log("Finalize Purchase with:", { shippingDetails, paymentDetails });
            dispatch(clearCart());
            navigate('/purchase-confirmation');
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const calculateTotal = () => {
        return cartItems.reduce((total: number, item) => total + (Number(item.price) * item.quantity), 0).toFixed(2);
    };

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <Box>
                        <TextField
                            label="First Name"
                            fullWidth
                            variant="outlined"
                            value={shippingDetails.firstName}
                            onChange={(e) => setShippingDetails({ ...shippingDetails, firstName: e.target.value })}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Last Name"
                            fullWidth
                            variant="outlined"
                            value={shippingDetails.lastName}
                            onChange={(e) => setShippingDetails({ ...shippingDetails, lastName: e.target.value })}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Address Line 1"
                            fullWidth
                            variant="outlined"
                            value={shippingDetails.address1}
                            onChange={(e) => setShippingDetails({ ...shippingDetails, address1: e.target.value })}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Address Line 2"
                            fullWidth
                            variant="outlined"
                            value={shippingDetails.address2}
                            onChange={(e) => setShippingDetails({ ...shippingDetails, address2: e.target.value })}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="City"
                            fullWidth
                            variant="outlined"
                            value={shippingDetails.city}
                            onChange={(e) => setShippingDetails({ ...shippingDetails, city: e.target.value })}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="State"
                            fullWidth
                            variant="outlined"
                            value={shippingDetails.state}
                            onChange={(e) => setShippingDetails({ ...shippingDetails, state: e.target.value })}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Zip / Postal Code"
                            fullWidth
                            variant="outlined"
                            value={shippingDetails.zip}
                            onChange={(e) => setShippingDetails({ ...shippingDetails, zip: e.target.value })}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Country"
                            fullWidth
                            variant="outlined"
                            value={shippingDetails.country}
                            onChange={(e) => setShippingDetails({ ...shippingDetails, country: e.target.value })}
                            sx={{ mb: 2 }}
                        />
                    </Box>
                );
            case 1:
                return (
                    <Box>
                        <TextField
                            label="Card Number"
                            fullWidth
                            variant="outlined"
                            value={paymentDetails.cardNumber}
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Expiry Date"
                            fullWidth
                            variant="outlined"
                            value={paymentDetails.expiryDate}
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="CVV"
                            fullWidth
                            variant="outlined"
                            value={paymentDetails.cvv}
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
                            sx={{ mb: 2 }}
                        />
                    </Box>
                );
            case 2:
                return (
                    <Box>
                        <Typography variant="h6" sx={{ mb: 2 }}>Order Summary</Typography>
                        <List>
                            {cartItems.map((item) => (
                                <ListItem key={item.productId}>
                                    <ListItemText
                                        primary={item.name}
                                        secondary={`Quantity: ${item.quantity} x $${Number(item.price).toFixed(2)}`}
                                    />
                                </ListItem>
                            ))}
                            <Divider light />
                            <ListItem>
                                <ListItemText primary="Total" secondary={`$${calculateTotal()}`} />
                            </ListItem>
                        </List>
                        <Typography variant="h6" sx={{ mt: 4 }}>Shipment Details</Typography>
                        <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
                            {`${shippingDetails.firstName} ${shippingDetails.lastName}`}
                            <br />
                            {`${shippingDetails.address1}, ${shippingDetails.address2}`}
                            <br />
                            {`${shippingDetails.city}, ${shippingDetails.state} ${shippingDetails.zip}, ${shippingDetails.country}`}
                        </Paper>
                        <Typography variant="h6" sx={{ mt: 4 }}>Payment Details</Typography>
                        <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
                            <div>Card holder: {paymentDetails.cardHolder}</div>
                            <div>Card number: {paymentDetails.cardNumber}</div>
                            <div>Expiry date: {paymentDetails.expiryDate}</div>
                        </Paper>
                    </Box>
                );
            default:
                throw new Error('Unknown step');
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={7}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                        Checkout
                    </Typography>
                    <div>
                        {getStepContent(activeStep)}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            {activeStep !== 0 && (
                                <Button onClick={handleBack} sx={{ mr: 1 }}>
                                    Back
                                </Button>
                            )}
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                            >
                                {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
                            </Button>
                        </Box>
                    </div>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Order Summary</Typography>
                    <List>
                        {cartItems.map((item) => (
                            <ListItem key={item.productId}>
                                <ListItemText
                                    primary={item.name}
                                    secondary={`Quantity: ${item.quantity} x $${Number(item.price).toFixed(2)}`}
                                />
                            </ListItem>
                        ))}
                        <Divider light />
                        <ListItem>
                            <ListItemText primary="Total" secondary={`$${calculateTotal()}`} />
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CheckoutPage;
