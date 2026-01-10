import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Product from './pages/Product';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Navbar from './components/Navbar'; // Import Navbar
import './App.css';
import Cart from './pages/Cart';  // Import Cart Page
import Checkout from './pages/Checkout'; 
import OrderConfirmation from './pages/OrderConfirmation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Login";
import PageTracker from "./tracking/PageTracker";

const App = () => {
    return (
        <Router>
            <Navbar /> {/* Add Navbar here */}
            <ToastContainer />
            <PageTracker />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Product />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />  {/* Add Cart Route */}
                <Route path="/login" element={<Login />} />
                <Route path="/checkout" element={<Checkout />} />  
                <Route path="/confirmation" element={<OrderConfirmation />} />  {/* New Confirmation Page */}
            </Routes>
        </Router>
    );
};

export default App;
