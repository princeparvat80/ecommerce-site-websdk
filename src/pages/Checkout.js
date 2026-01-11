import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";
import { useAuth } from "../auth/AuthContext";
import { pushBeginCheckoutEvent } from "../tracking/initDataLayer ";

const Checkout = () => {
  const { auth } = useAuth();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 🔒 HARD AUTH GUARD (prevents anonymous checkout)
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/login", { state: { from: "/checkout" } });
    }
  }, [auth, navigate]);

   // BEGIN CHECKOUT (fire ONCE after auth)
  useEffect(() => {
    if (auth.isAuthenticated) {
      pushBeginCheckoutEvent(cart);
    }
  }, [auth.isAuthenticated]);

  // Calculate total safely
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePayment = () => {
    alert("Thank you for shopping with us!");

    //  Purchase completed → clear cart
    dispatch(clearCart());

    //  Redirect to confirmation / feedback page
    navigate("/confirmation"); // or "/feedback"
  };

  if (!auth.isAuthenticated) {
    // Prevent UI flicker while redirecting
    return null;
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>

          <button
            onClick={handlePayment}
            className="checkout-button"
          >
            Proceed to Payment
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;
