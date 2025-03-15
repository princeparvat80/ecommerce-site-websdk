import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../redux/cartSlice';
import { Link } from 'react-router-dom';

const Cart = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();

    return (
        <div className="cart-container">
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Cart is empty</p>
            ) : (
                <>
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.title} className="cart-item-image" />
                            <div className="cart-item-info">
                                <h3>{item.title}</h3>
                                <p>Price: ${item.price}</p>
                                <div className="quantity-controls">
                                    <button onClick={() => dispatch(decreaseQuantity(item.id))} className="quantity-button">-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => dispatch(increaseQuantity(item.id))} className="quantity-button">+</button>
                                </div>
                            </div>
                            <button onClick={() => dispatch(removeFromCart(item.id))} className="remove-button">
                                Remove
                            </button>
                        </div>
                    ))}
                    
                    {/* Checkout Button - Only shows if there are items in the cart */}
                    <div className="checkout-section">
                        <Link to="/checkout" className="checkout-button">Go to Checkout</Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
