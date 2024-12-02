import React from 'react';
import axios from 'axios';

const userId = 'static_user_id'; // ID tĩnh của người dùng

const ProductList = ({ products }) => {
  const handleAddToCart = (productId) => {
    axios.post('/api/giohang/add-from-list', { nguoi_dung_id: userId, chuyen_xe_id: productId })
      .then(response => {
        alert('Sản phẩm đã được thêm vào giỏ hàng');
      })
      .catch(error => {
        console.error('Error adding product to cart:', error);
      });
  };

  return (
    <div>
      <h1>Danh sách sản phẩm</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name}
            <button onClick={() => handleAddToCart(product.id)}>Thêm vào giỏ hàng</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;