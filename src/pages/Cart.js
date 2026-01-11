import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../redux/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

// 🔹 DATA LAYER IMPORTS (NEW)
import {
  pushViewCartEvent,
  pushAddToCartEvent,
  pushRemoveFromCartEvent
} from "../tracking/initDataLayer ";

const Cart = () => {
  // 🔹 FULL CART STATE (NEW – needed for data layer)
  const cart = useSelector(state => state.cart);
  const cartItems = cart.cartItems;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useAuth();

  // 🔹 FIRE view_cart ON PAGE LOAD (NEW)
  useEffect(() => {
    if (cartItems.length > 0) {
      pushViewCartEvent(cart);
    }
  }, []); // intentional: fire once on cart page load

  const handleCheckout = () => {
    if (!auth.isAuthenticated) {
      navigate("/login", { state: { from: "/checkout" } });
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img
                src={item.image}
                alt={item.title}
                className="cart-item-image"
              />

              <div className="cart-item-info">
                <h3>{item.title}</h3>
                <p>Price: ${item.price}</p>

                <div className="quantity-controls">
                  {/* ➖ DECREASE QUANTITY (NEW TRACKING) */}
                  <button
                    className="quantity-button"
                    onClick={() => {
                      dispatch(decreaseQuantity(item.id));

                      pushRemoveFromCartEvent({
                        product: item,
                        cart: {
                          items: cartItems
                            .map(ci =>
                              ci.id === item.id
                                ? { ...ci, quantity: ci.quantity - 1 }
                                : ci
                            )
                            .filter(ci => ci.quantity > 0),
                          totalQuantity: cart.totalQuantity - 1,
                          totalAmount: cart.totalAmount - item.price
                        }
                      });
                    }}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  {/* ➕ INCREASE QUANTITY (NEW TRACKING) */}
                  <button
                    className="quantity-button"
                    onClick={() => {
                      dispatch(increaseQuantity(item.id));

                      pushAddToCartEvent({
                        product: item,
                        cart: {
                          items: cartItems.map(ci =>
                            ci.id === item.id
                              ? { ...ci, quantity: ci.quantity + 1 }
                              : ci
                          ),
                          totalQuantity: cart.totalQuantity + 1,
                          totalAmount: cart.totalAmount + item.price
                        }
                      });
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* 🗑 REMOVE ITEM COMPLETELY (NEW TRACKING) */}
              <button
                className="remove-button"
                onClick={() => {
                  dispatch(removeFromCart(item.id));

                  pushRemoveFromCartEvent({
                    product: item,
                    cart: {
                      items: cartItems.filter(ci => ci.id !== item.id),
                      totalQuantity: cart.totalQuantity - item.quantity,
                      totalAmount:
                        cart.totalAmount - item.price * item.quantity
                    }
                  });
                }}
              >
                Remove
              </button>
            </div>
          ))}

          {/* CHECKOUT CTA (UNCHANGED LOGIC) */}
          <div className="checkout-section">
            <Link
              to="/checkout"
              className="checkout-button"
              onClick={handleCheckout}
            >
              Go to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
