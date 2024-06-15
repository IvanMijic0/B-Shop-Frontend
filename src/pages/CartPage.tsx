// src/pages/CartPage.tsx
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const items = useSelector((state: RootState) => state.cart.items);
    const navigate = useNavigate();

    const calculateTotal = () => {
        return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Shopping Cart
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item) => (
                        <TableRow key={item.productId}>
                            <TableCell component="th" scope="row">
                                {item.name}
                            </TableCell>
                            <TableCell align="right">{item.quantity}</TableCell>
                            <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                            <TableCell align="right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Typography variant="h6" sx={{ marginTop: 2 }}>
                Total: ${calculateTotal()}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleCheckout} sx={{ mt: 2 }}>
                Proceed to Checkout
            </Button>
        </div>
    );
};

export default CartPage;
