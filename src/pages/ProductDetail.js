import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateProductDataLayer } from "../tracking/initDataLayer ";

const ProductDetail = () => {
    // const { id } = useParams();
    const [product, setProduct] = useState(null);
    const dispatch = useDispatch();
    const { slug } = useParams();
    const productId = slug.split("-")[0];

useEffect(() => {
  if (!productId) return;

  axios
    .get(`https://fakestoreapi.com/products/${productId}`)
    .then((response) => {
      const data = response.data; // ✅ DEFINE data ONCE

      setProduct(data);

      updateProductDataLayer({
        id: data.id,
        name: data.title,
        category: data.category,
        price: data.price,
        currency: "USD",
        rating: data.rating?.rate,
        description: data.description
      });
    })
    .catch((error) =>
      console.error("Error fetching product:", error)
    );
}, [productId]);


    const handleAddToCart = () => {
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

    if (!product) return <p>Loading...</p>;

    return (
        <div className="product-detail-container">
            <div className="product-detail">
                <img src={product.image} alt={product.title} className="product-detail-image" />
                <div className="product-info">
                    <h1>{product.title}</h1>
                    <p className="product-description">Category : {product.category}</p>
                    <p className="product-price">Price: <strong>${product.price}</strong></p>
                    <p className="product-description">⭐ Rating: {product.rating?.rate} / 5 ({product.rating?.count} reviews)</p>
                    <p className="product-description">{product.description}</p>
                    <button onClick={handleAddToCart} className="add-to-cart-button">
                        Add to Cart
                    </button>
                    <Link to="/products" className="back-button">Back to Product</Link>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
