import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import productService from '../services/productService';
import { Typography, Paper, Container } from '@mui/material';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        productService.getProductById(id).then((response) => {
            setProduct(response.data);
        });
    }, [id]);

    if (!product) {
        return <Typography variant="h5">Loading...</Typography>;
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h4" gutterBottom>
                    Product Details
                </Typography>
                <Typography variant="h6">Name: {product.name}</Typography>
                <Typography variant="body1">Description: {product.description}</Typography>
                <Typography variant="body1">Price: ${product.price}</Typography>
                <Typography variant="body1">Category: {product.category}</Typography>
                <Typography variant="body1">Stock Quantity: {product.stockQuantity}</Typography>
                <Typography variant="body1">Created Date: {formatDate(product.createdAt)}</Typography>
                <Typography variant="body1">Last Updated: {formatDate(product.updatedAt)}</Typography>
                <Typography variant="body1" style={{ marginTop: '16px' }}>
                    <Link to="/">Back to Product List</Link>
                </Typography>
            </Paper>
        </Container>
    );
};

export default ProductDetails;
