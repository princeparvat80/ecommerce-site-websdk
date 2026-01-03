const AUTH_KEY = "ECOM_AUTH_USER";

export const getStoredAuth = () => {
  try {
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const storeAuth = (authData) => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
};

export const clearStoredAuth = () => {
  localStorage.removeItem(AUTH_KEY);
};
