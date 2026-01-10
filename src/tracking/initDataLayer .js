export const initDataLayer = () => {
  window.dataLayer = {
    /* =========================
       PAGE CONTEXT
    ========================= */
    page: {
      name: null,              // Home, Products, Cart, Checkout
      type: null,              // home, product_list, cart, checkout
      url: window.location.pathname,
      previousPage: null,
      referrerType: "direct",  // direct | internal | external
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    },

    /* =========================
       USER / IDENTITY CONTEXT
    ========================= */
    user: {
      isLoggedIn: false,
      loginState: "guest",     // guest | authenticated
      authId: null,            // email
      authNamespace: null      // email
    },

    /* =========================
       COMMERCE CONTEXT
    ========================= */
    commerce: {
      cart: {
        id: null,
        itemCount: 0,
        totalQuantity: 0,
        totalValue: 0,
        currency: "USD",
        items: []
      }
    },

    /* =========================
       PRODUCT CONTEXT
       (used on PDP / clicks)
    ========================= */
    product: {
      id: null,
      name: null,
      category: null,
      price: null,
      currency: "USD",
      position: null,
      listName: null
    },

    /* =========================
       UI / INTERACTION CONTEXT
    ========================= */
    ui: {
      ctaLabel: null,
      ctaLocation: null,
      interactionType: null,   // click | submit | view
      scrollDepth: null,
      formError: null
    },

    /* =========================
       EVENT CONTEXT
       (rules will key off this)
    ========================= */
    event: {
      name: null,              // page_view, add_to_cart, login, etc.
      category: null,          // navigation | commerce | identity | ui
      timestamp: null
    },

    /* =========================
       META / GOVERNANCE
    ========================= */
    meta: {
      environment: "prod",
      appVersion: "1.0.0",
      trackingVersion: "aep-princeparvat-v1"
    }
  };
};
