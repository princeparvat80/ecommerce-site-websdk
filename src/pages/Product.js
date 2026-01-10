import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { slugify } from "../utils/slugify";

const Product = () => {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        toast.success("🛒 Product added to cart!", {
            position: "top-right",
            autoClose: 2000, // Closes after 2 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    };

    return (
        <div className="product-container">
            <h1>Our Products</h1>
            <div className="products-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.title} className="product-image" />
                        <h3>{product.title}</h3>
                        <p className="price">Price: ${product.price}</p>
                        <div className="product-buttons">
                            <button onClick={() => handleAddToCart(product)} className="add-to-cart-button">
                                Add to Cart
                            </button>
                            <Link to={`/product/${slugify(product.id, product.title)}`} className="details-button">
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Product;
