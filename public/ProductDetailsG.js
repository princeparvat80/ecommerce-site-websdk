import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetailsG = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.error('Error fetching product:', error));
    }, [id]);

    const handleAddToCart = () => {
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

    if (!product) return <p>Loading...</p>;

    return (
        <div className="product-detail-container">
            <div className="product-detail">
                <img src={product.thumbnail} alt={product.title} className="product-detail-image" />
                <div className="product-info">
                    <h1>{product.title}</h1>
                    <p className="product-price">Price: ${product.price}</p>
                    <p className="product-description">{product.description}</p>
                    <button onClick={handleAddToCart} className="add-to-cart-button">
                        Add to Cart
                    </button>
                    <Link to="/" className="back-button">Back to Home</Link>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsG;
