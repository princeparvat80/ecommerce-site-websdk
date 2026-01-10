import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PAGE_MAP = {
  "/": { name: "Home", type: "home" },
  "/products": { name: "Products", type: "product_list" },
  "/cart": { name: "Cart", type: "cart" },
  "/checkout": { name: "Checkout", type: "checkout" },
  "/login": { name: "Login", type: "login" },
   "/confirmation": { name: "Order Confirmation", type: "order_confirmation" },
};

const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    let pageName = "Unknown";
    let pageType = "other";

    //  HANDLE PRODUCT DETAIL PAGE (DYNAMIC ROUTE)
    if (location.pathname.startsWith("/product/")) {
      pageName = "Product Detail";
      pageType = "product_detail";
    }
    //  HANDLE STATIC ROUTES
    else if (PAGE_MAP[location.pathname]) {
      pageName = PAGE_MAP[location.pathname].name;
      pageType = PAGE_MAP[location.pathname].type;
    }

    window.dataLayer.page = {
      ...window.dataLayer.page,
      name: pageName,
      type: pageType,
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
