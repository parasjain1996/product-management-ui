import React, { useState, useEffect } from 'react';
import productService from '../services/productService';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const ProductForm = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stockQuantity: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString() 
    });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            productService.getProductById(id).then((response) => {
                setProduct(response.data);
            });
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedProduct = {
            ...product,
            updatedAt: new Date().toISOString() // Update updatedAt field
        };

        if (id) {
            productService.updateProduct(id, updatedProduct).then(() => {
                navigate('/');
            });
        } else {
            updatedProduct.createdAt = new Date().toISOString(); // Set createdAt for new product
            productService.createProduct(updatedProduct).then(() => {
                navigate('/');
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom align="center">
                {id ? 'Edit Product' : 'Add Product'}
            </Typography>
            <Box 
                component="form" 
                onSubmit={handleSubmit} 
                sx={{ 
                    '& .MuiTextField-root': { mt: 2, mb: 2 }, 
                    '& .MuiButton-root': { mt: 2 }
                }}
            >
                <TextField
                    label="Name"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <TextField
                    label="Description"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    fullWidth
                    required
                    multiline
                    rows={4}
                />
                <TextField
                    label="Price"
                    name="price"
                    type="number"
                    value={product.price}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <TextField
                    label="Category"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <TextField
                    label="Stock Quantity"
                    name="stockQuantity"
                    type="number"
                    value={product.stockQuantity}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    {id ? 'Update' : 'Create'} Product
                </Button>
            </Box>
        </Container>
    );
};

export default ProductForm;
