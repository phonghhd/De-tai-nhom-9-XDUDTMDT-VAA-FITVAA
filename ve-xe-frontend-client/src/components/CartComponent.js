// CartComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CartComponent() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const response = await axios.get('/api/giohang');
      setCart(response.data);
    };
    fetchCart();
  }, []);

  const removeFromCart = async (productId) => {
    await axios.delete(`/api/giohang/${productId}`);
    setCart(cart.filter(item => item.ID !== productId));
  };

  const proceedToPayment = () => {
    // Redirect to payment page
    window.location.href = '/payment';
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map(item => (
            <li key={item.ID}>
              <span>{item.name} - {item.quantity}</span>
              <button onClick={() => removeFromCart(item.ID)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      {cart.length > 0 && (
        <button onClick={proceedToPayment}>Proceed to Payment</button>
      )}
    </div>
  );
}

export default CartComponent;