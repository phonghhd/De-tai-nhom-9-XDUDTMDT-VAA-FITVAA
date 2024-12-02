import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../main-nav.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Đọc giỏ hàng từ localStorage
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(savedCart);
  }, []);

  const handleQuantityChange = (index, value) => {
    const quantity = Number(value);
    if (quantity > 0) {
      const updatedCart = [...cartItems];
      updatedCart[index].quantity = quantity;
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  const handleRemove = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.gia * item.quantity, 0).toFixed(2);

  return (
    <div className="cart-container">
      <h1 className="cart-header">Giỏ hàng</h1>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng trống.</p>
      ) : (
        <ul className="cart-items">
          {cartItems.map((item, index) => (
            <li key={index} className="cart-item">
              <p>{item.ten_khach_hang}</p>
              <p>Price: {item.gia} VND</p>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(index, e.target.value)}
                min="1"
              />
              <button onClick={() => handleRemove(index)}>Xóa</button>
            </li>
          ))}
        </ul>
      )}
      <h2 className="cart-total">Tổng giá: {totalPrice} VND</h2>
    </div>
  );
};

export default Cart;