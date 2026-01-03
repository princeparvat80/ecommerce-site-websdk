const CART_KEY = "ECOM_CART_STATE";

export const loadCartFromStorage = () => {
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : undefined;
  } catch {
    return undefined;
  }
};

export const saveCartToStorage = (cartState) => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cartState));
  } catch {
    // fail silently – cart logic must not break
  }
};

export const clearCartStorage = () => {
  localStorage.removeItem(CART_KEY);
};
