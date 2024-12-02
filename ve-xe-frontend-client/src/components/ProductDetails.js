import React, { useState } from 'react';
import axios from 'axios';

const ProductDetails = ({ product, userId }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    axios.post('/api/giohang/add-from-details', {
      nguoi_dung_id: userId,
      chuyen_xe_id: product.id,
      so_luong: quantity
    })
      .then(response => alert('Sản phẩm đã được thêm vào giỏ hàng'))
      .catch(error => console.error('Error adding product to cart:', error));
  };

  return (
    <div>
      <h1>Chi tiết sản phẩm</h1>
      <p>{product.name}</p>
      <p>{product.description}</p>
      <input
        type="number"
        value={quantity}
        min="1"
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <button onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
    </div>
  );
};

export default ProductDetails;