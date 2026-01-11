import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../auth/AuthContext";

const Navbar = () => {
  const { auth, logout } = useAuth();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* LOGO */}
      <div className="logo">
        <Link to="/">Prince AEP Lab</Link>
      </div>

      {/* NAV ITEMS */}
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/products">Products</Link>
        </li>

        <li>
          {/* IMPORTANT: position-relative wrapper */}
          <Link to="/cart" className="cart-link">
            <span className="cart-icon">🛒</span>
            Cart
            {cartCount > 0 && (
              <span className="cart-count">{cartCount}</span>
            )}
          </Link>
        </li>

        {/* AUTH ACTION */}
        {!auth.isAuthenticated ? (
          <li>
            <Link to="/login" className="cart-link">
              Login
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/" className="cart-link" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
