import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa'; // Import cart icon


const Navbar = () => {
    const cartItems = useSelector(state => state.cart.cartItems);

    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">Prince Store</Link>
            </div>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li>
                    <Link to="/cart" className="cart-link">
                        <FaShoppingCart className="cart-icon" />
                        Cart {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
