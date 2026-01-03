import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="hero">
      <div className="hero-content">
        <h1>
          Experience Modern <br />
          eCommerce, Done Right
        </h1>

        <p className="hero-subtitle">
          A high-fidelity demo store built to showcase real customer journeys,
          real commerce flows, and real-time personalization using Adobe
          Experience Platform.
        </p>

        <div className="hero-actions">
          <button
            className="primary-cta"
            onClick={() => navigate("/products")}
          >
            Explore Products
          </button>

          <span className="secondary-text">
            Built for AEP • CJA • AJO demos
          </span>
        </div>
      </div>

      {/* Value props */}
      <div className="value-props">
        <div className="value-card">
          <h3>Real Commerce</h3>
          <p>Product discovery, cart, checkout & purchase flows.</p>
        </div>

        <div className="value-card">
          <h3>Real Identity</h3>
          <p>Guest → login → profile stitching done correctly.</p>
        </div>

        <div className="value-card">
          <h3>Real Data</h3>
          <p>XDM-aligned events powering analytics & journeys.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
