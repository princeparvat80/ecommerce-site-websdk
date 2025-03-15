import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomeG = () => {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        fetch('https://dummyjson.com/products/category/groceries')
            .then(response => response.json())
            .then(data => setProducts(data.products)) // "products" is the key in API response
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        toast.success("🛒 Product added to cart!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
        });
    };

    return (
        <div className="home-container">
            <h1>Grocery Products</h1>
            <div className="products-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <img src={product.thumbnail} alt={product.title} className="product-image" />
                        <h3>{product.title}</h3>
                        <p className="price">Price: ${product.price}</p>
                        <div className="product-buttons">
                            <button onClick={() => handleAddToCart(product)} className="add-to-cart-button">
                                Add to Cart
                            </button>
                            <Link to={`/product/${product.id}`} className="details-button">
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeG;
