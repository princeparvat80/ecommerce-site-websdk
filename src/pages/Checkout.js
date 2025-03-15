import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/cartSlice';

const Checkout = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handlePayment = () => {
        dispatch(clearCart()); // Clear the cart after purchase
        navigate('/confirmation'); // Redirect to Confirmation Page
    };

    return (
        <div className="checkout-container">
            <h1>Checkout</h1>
            <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
            <button onClick={handlePayment} className="checkout-button">Proceed to Payment</button>
        </div>
    );
};

export default Checkout;
