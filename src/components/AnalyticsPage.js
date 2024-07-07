import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import productService from '../services/productService';

const AnalyticsPage = () => {
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        productService.getAllProducts().then((response) => {
            setProductData(response.data);
        });
    }, []);

    const getCategoryShareData = () => {
        const categoryMap = new Map();
        productData.forEach((product) => {
            const { category } = product;
            if (categoryMap.has(category)) {
                categoryMap.set(category, categoryMap.get(category) + 1);
            } else {
                categoryMap.set(category, 1);
            }
        });
        return Array.from(categoryMap.entries()).map(([category, count]) => ({ category, count }));
    };

    const categoryData = getCategoryShareData();

    const getMonthlyPerformanceData = () => {
        const monthMap = new Map();
        productData.forEach((product) => {
            const { updatedAt, price, stockQuantity } = product;
            const month = new Date(updatedAt).toLocaleString('default', { month: 'short' });
            const sales = price * stockQuantity;
            if (monthMap.has(month)) {
                monthMap.set(month, monthMap.get(month) + sales);
            } else {
                monthMap.set(month, sales);
            }
        });
        return Array.from(monthMap.entries()).map(([month, sales]) => ({ month, sales }));
    };

    const monthlyPerformanceData = getMonthlyPerformanceData();

    const formatLargeNumber = (tickItem) => {
        if (tickItem >= 1000000) {
            return `${(tickItem / 1000000).toFixed(1)}M`;
        } else if (tickItem >= 1000) {
            return `${(tickItem / 1000).toFixed(1)}K`;
        }
        return tickItem;
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" marginTop={"20px"} gutterBottom>
                Product Analytics
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
                {/* Pie Chart */}
                <div style={{ width: '45%' }}>
                    <Typography variant="h6" gutterBottom>
                        Product Category Share
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={categoryData}
                                dataKey="count"
                                nameKey="category"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                            >
                                {
                                    categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
                                    ))
                                }
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Bar Chart */}
                <div style={{ width: '45%' }}>
                    <Typography variant="h6" gutterBottom>
                        Monthly Sales Performance
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            data={monthlyPerformanceData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis tickFormatter={formatLargeNumber} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="sales" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </Container>
    );
};

export default AnalyticsPage;
