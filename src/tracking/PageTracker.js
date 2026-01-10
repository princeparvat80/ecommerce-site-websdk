import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PAGE_MAP = {
  "/": { name: "Home", type: "home" },
  "/products": { name: "Products", type: "product_list" },
  "/cart": { name: "Cart", type: "cart" },
  "/checkout": { name: "Checkout", type: "checkout" },
  "/login": { name: "Login", type: "login" }
};

const PageTracker = () => {
  const location = useLocation();

useEffect(() => {
  const pageConfig = PAGE_MAP[location.pathname] || {
    name: "Unknown",
    type: "other"
  };

  window.dataLayer.page = {
    ...window.dataLayer.page,
    name: pageConfig.name,
    type: pageConfig.type,
    url: location.pathname,
    previousPage: window.dataLayer.page.url,
    referrerType: window.dataLayer.page.url ? "internal" : "direct"
  };

  window.dataLayer.event = {
    name: "page_view",
    category: "navigation",
    timestamp: Date.now()
  };

  console.log("📘 dataLayer.page updated:", window.dataLayer.page);
}, [location.pathname]);


  return null; // IMPORTANT: renders nothing
};

export default PageTracker;
