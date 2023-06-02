import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const GraficosProductos = () => {
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
    <div style={{ width: '100%', height: 300, borderRadius: '10px'}}>
 
      <PieChart width={500} height={300}>
        <Pie
          dataKey="cantidad"
          nameKey="nombre"
          data={products}
          innerRadius={60}
          outerRadius={85}
          fill="#82ca9d"
          label={(entry) => `${entry.nombre} (${entry.cantidad})`}
        >
          {products.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div >
  );
};

export default GraficosProductos;