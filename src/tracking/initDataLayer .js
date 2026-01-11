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

export const updateProductDataLayer = (product) => {
  if (!window.dataLayer) return;

  window.dataLayer.product = {
    id: String(product.id),
    name: product.name,
    category: product.category,
    price: product.price,
    currency: product.currency,
    rating : product.rating,
    description : product.description
  };

  // Optional but very useful for debugging
  console.log("dataLayer.product updated:", window.dataLayer.product);
};

export const pushAddToCartEvent = ({ product, cart }) => {
  if (!window.dataLayer) return;

  window.dataLayer.product = {
    id: String(product.id),
    name: product.title,
    category: product.category,
    price: product.price,
    currency: "USD"
  };

  window.dataLayer.cart = {
    items: cart.items.map(item => ({
      id: String(item.id),
      name: item.title,
      price: item.price,
      quantity: item.quantity
    })),
    totalQuantity: cart.totalQuantity,
    totalValue: cart.totalAmount,
    currency: "USD"
  };

  window.dataLayer.event = {
    name: "add_to_cart",
    category: "commerce",
    timestamp: Date.now()
  };

  console.log("add_to_cart event fired:", window.dataLayer);
};