import React, { useEffect, useState } from 'react';
import { useCart } from '../components/CartContext';
import axios from 'axios';
import '../main-nav.css';
import Footer from '../components/footer';


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const { userId, updateQuantity, removeFromCart } = useCart();

  useEffect(() => {
    axios.get(`/api/giohang/${userId}`)
      .then(response => setCartItems(response.data))
      .catch(error => console.error('Error fetching cart items:', error));
  }, [userId]);

  const handleQuantityChange = (id, value) => {
    const quantity = Number(value);
    if (quantity > 0) {
      axios.put(`/api/giohang/${userId}/${id}`, { quantity })
        .then(() => updateQuantity(id, quantity))
        .catch(error => console.error('Error updating quantity:', error));
    }
  };

  const handleRemove = (id) => {
    axios.delete(`/api/giohang/${userId}/${id}`)
      .then(() => removeFromCart(id))
      .catch(error => console.error('Error removing item:', error));
  };

  const handleSelectProduct = (product) => {
    if (selectedProducts.some((item) => item.product_id === product.product_id)) {
        const nextProductList = selectedProducts.filter(
            (productItem) => productItem.product_id !== product.product_id
        );
        setSelectedProducts(nextProductList);
    } else {
        setSelectedProducts([...selectedProducts, product]);
    }
  };

  const calculateTotalPrice = () => {
    return selectedProducts.reduce((total, product) => {
        return total + product.price * product.quantity;
    }, 0);
  };

  const handlePayment = async () => {
    try {
      const total = calculateTotalPrice();
      const newPayment = {
        products: selectedProducts,
        amount: total,
        bankCode: null, // Let user choose the payment method
        language: "vn",
      };
      const response = await axios.post('http://localhost:5000/api/v1/vnpay/create_payment_url', newPayment);
      if (response.status === 200 && response.data) {
        window.location.href = response.data; // Redirect to payment URL
      }
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  const totalPrice = calculateTotalPrice().toFixed(2);

  return (
    <div className="cart-container">
      <h1 className="cart-header">Giỏ hàng</h1>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng trống.</p>
      ) : (
        <ul className="cart-items">
          {cartItems.map(item => (
            <li key={item.product_id} className="cart-item">
              <input
                type="checkbox"
                checked={selectedProducts.some((product) => product.product_id === item.product_id)}
                onChange={() => handleSelectProduct(item)}
              />
              <p>{item.name}</p>
              <p>Price: ${item.price}</p>
              <input
                type="number"value={item.quantity}
                onChange={(e) => handleQuantityChange(item.product_id, e.target.value)}
                min="1"
              />
              <button onClick={() => handleRemove(item.product_id)}>Xóa</button>
            </li>
          ))}
        </ul>
      )}
      <h2 className="cart-total">Tổng giá: ${totalPrice}</h2>
      <button onClick={handlePayment}>Thanh toán</button>

      <h2>Các sản phẩm đã chọn</h2>
      {selectedProducts.length > 0 ?
        <>
          <ul>
            {selectedProducts.map((product, index) => (
              <li key={index}>{product.name} - ${product.price} x {product.quantity}</li>
            ))}
          </ul>
          <h4>Tổng số tiền: ${calculateTotalPrice()}</h4>
        </>
        :
        <i>Chưa có sản phẩm được chọn</i>
      }


      <Footer />
    </div>


  );
};

export default Cart;