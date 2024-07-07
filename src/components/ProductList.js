import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import productService from '../services/productService';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,
    TextField, InputAdornment, IconButton, TablePagination, Grid
} from '@mui/material';
import { Search as SearchIcon, Sort as SortIcon } from '@mui/icons-material';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        productService.getAllProducts().then((response) => {
            setProducts(response.data);
            setFilteredProducts(response.data);
        });
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        filterProducts(event.target.value);
    };

    const handleSortBy = (column) => {
        const isAsc = sortBy === column && sortOrder === 'asc';
        const order = isAsc ? 'desc' : 'asc';
        setSortBy(column);
        setSortOrder(order);
        sortProducts(column, order);
    };

    const filterProducts = (term) => {
        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    const sortProducts = (column, order) => {
        const sorted = [...filteredProducts].sort((a, b) => {
            if (order === 'asc') {
                return a[column] > b[column] ? 1 : -1;
            } else {
                return a[column] < b[column] ? 1 : -1;
            }
        });
        setFilteredProducts(sorted);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDelete = (id) => {
        productService.deleteProduct(id).then(() => {
            setProducts(products.filter((product) => product.id !== id));
            setFilteredProducts(filteredProducts.filter((product) => product.id !== id));
        });
    };

    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    return (
        <Paper sx={{ margin: '20px', padding: '20px' }}>
            <TextField
                label="Search by Name"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                sx={{ marginBottom: '20px' }}
            />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell onClick={() => handleSortBy('name')}>
                                Name {sortBy === 'name' && <SortIcon />}
                            </TableCell>
                            <TableCell onClick={() => handleSortBy('description')}>
                                Description {sortBy === 'description' && <SortIcon />}
                            </TableCell>
                            <TableCell onClick={() => handleSortBy('price')}>
                                Price {sortBy === 'price' && <SortIcon />}
                            </TableCell>
                            <TableCell onClick={() => handleSortBy('category')}>
                                Category {sortBy === 'category' && <SortIcon />}
                            </TableCell>
                            <TableCell onClick={() => handleSortBy('stockQuantity')}>
                                Stock Quantity {sortBy === 'stockQuantity' && <SortIcon />}
                            </TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProducts.slice(startIndex, endIndex).map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>${product.price}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>{product.stockQuantity}</TableCell>
                                <TableCell>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} sm={4}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => navigate(`/details/${product.id}`)}
                                                sx={{ fontSize: '0.8rem' }}
                                            >
                                                View Details
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => navigate(`/edit/${product.id}`)}
                                                sx={{ fontSize: '0.8rem' }}
                                            >
                                                Edit
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => handleDelete(product.id)}
                                                sx={{ fontSize: '0.8rem' }}
                                            >
                                                Delete
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredProducts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default ProductList;
