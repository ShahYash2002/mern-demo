import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductFetcher.css'; // Custom CSS for extra styling

const ProductFetcher = () => {
    const [url, setUrl] = useState('');
    const [product, setProduct] = useState(null);

    const fetchProductDetails = async () => {
        try {
            const response = await axios.post('https://mern-demo-cwtr.onrender.com/api/products/fetch-product', { url });
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-4">
                <header className="text-center">
                    <h1 className="display-5 text-primary mb-3">Flipkart Price Tracker</h1>
                    <p className="text-muted">Track prices and stay updated on your favorite products.</p>
                </header>

                <div className="input-group mb-4 w-75 mx-auto">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Flipkart Product URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <button className="btn btn-primary btn-lg" onClick={fetchProductDetails}>
                        Fetch Details
                    </button>
                </div>

                {product && (
                    <div className="product-details mt-5">
                        <div className="row">
                            <div className="col-md-4 text-center">
                                {/* Display Product Image */}
                                <img
                                    src={product.imageUrl}
                                    alt={product.title}
                                    className="img-fluid rounded shadow-sm mb-3"
                                    style={{ maxHeight: '300px', objectFit: 'contain' }}
                                />
                            </div>
                            <div className="col-md-8">
                                <h2 className="text-info">{product.title}</h2>
                                <p className="lead text-muted mb-4">{product.description}</p>

                                <h4 className="text-success">Current Price: ₹{product.currentPrice}</h4>

                                <h5 className="mt-4">Price History:</h5>
                                <ul className="list-group list-group-flush">
                                    {product.priceHistory.map((entry, index) => (
                                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                            ₹{entry.price}
                                            <span className="text-muted">{new Date(entry.date).toLocaleString()}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductFetcher;
