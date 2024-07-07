import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import ProductDetails from './components/ProductDetails'; // Import ProductDetails component
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import AnalyticsPage from './components/AnalyticsPage';

const App = () => {
    return (
        <Router>
            <Container>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" style={{ flexGrow: 1 }}>
                            Product Management
                        </Typography>
                        <Button component={Link} to="/" color="inherit">
                            Home
                        </Button>
                        <Button component={Link} to="/add" color="inherit">
                            Add Product
                        </Button>
                        <Button component={Link} to="/analytics" color="inherit">
                            Analytics
                        </Button>
                    </Toolbar>
                </AppBar>
                <Routes>
                    <Route exact path="/" element={<ProductList />} />
                    <Route path="/add" element={<ProductForm />} />
                    <Route path="/edit/:id" element={<ProductForm />} />
                    <Route path="/details/:id" element={<ProductDetails />} />
                    <Route path="/analytics" element={<AnalyticsPage />} />
                </Routes>
            </Container>
        </Router>
    );
};

export default App;
