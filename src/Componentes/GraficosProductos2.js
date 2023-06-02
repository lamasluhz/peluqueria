import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GraficosProductos2 = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://localhost:7137/StockProducto/GetStockProductos');
                setProducts(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, []);
    const colors = ['#90EE90', '#FFA500', '#4169E1', '#FFC0CB', '#FFFF00', '#87CEEB'];
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '1%', marginLeft: '1%',borderRadius: '10px'}}>
                <BarChart  width={500} height={300} data={products} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="4 1 2" />
                    <XAxis dataKey="nombre" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="cantidad" fill="#8884d8" barSize={50} >
                        {products.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Bar>
                </BarChart>
        </div>
    );
}

export default GraficosProductos2;