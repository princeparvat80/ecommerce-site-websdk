import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Navbar from './components/Navbar'; // Import Navbar
import './App.css';
import Cart from './pages/Cart';  // Import Cart Page
import Checkout from './pages/Checkout'; 
import OrderConfirmation from './pages/OrderConfirmation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
    return (
        <Router>
            <Navbar /> {/* Add Navbar here */}
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />  {/* Add Cart Route */}
                <Route path="/checkout" element={<Checkout />} />  
                <Route path="/confirmation" element={<OrderConfirmation />} />  {/* New Confirmation Page */}
            </Routes>
        </Router>
    );
};

export default App;
