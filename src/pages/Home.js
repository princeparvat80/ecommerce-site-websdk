import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-hero">
        <h1>Welcome to Prince Store</h1>

        <p className="home-subtitle">
          Your one-stop destination for thoughtfully curated products — built
          to demonstrate a modern, data-driven eCommerce experience.
        </p>

        <p className="home-description">
          Prince Store is a sample eCommerce application designed to showcase
          real-world customer journeys — from browsing and cart management to
          checkout and post-purchase experiences.
          <br /><br />
          This platform also serves as a practical foundation for learning and
          demonstrating Adobe Experience Platform, Customer Journey Analytics,
          and Adobe Journey Optimizer in action.
        </p>

        <button
          className="home-button"
          onClick={() => navigate("/products")}
        >
          Explore All Products
        </button>
      </div>
    </div>
  );
};

export default Home;
