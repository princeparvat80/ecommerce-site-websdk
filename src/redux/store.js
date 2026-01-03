import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import {
  loadCartFromStorage,
  saveCartToStorage,
} from "../pages/cartPersistence";

// 1️Load cart from storage (safe)
const preloadedState = {
  cart: loadCartFromStorage(),
};

// 2️Create Redux store
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState,
});

// 3Persist cart on every change
store.subscribe(() => {
  const state = store.getState();
  saveCartToStorage(state.cart);
});
