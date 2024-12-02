import React from 'react';
import axios from 'axios';

const userId = 'static_user_id'; // ID tĩnh của người dùng

const Product = ({ product }) => {
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
    <div className="product">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <button onClick={() => handleAddToCart(product.id)}>Thêm vào giỏ hàng</button>
    </div>
  );
};

export default Product;