import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function BookingForm({ selectedTicket }) {
  const [ten_khach_hang, setTen_khach_hang] = useState('');
  const [so_dien_thoai, setSo_dien_thoai] = useState('');
  const [so_cho, setSo_cho] = useState([]);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedTicket) {
      alert('Vui lòng chọn một vé!');
      navigate('/tickets');
    }
  }, [selectedTicket, navigate]);

  const handleSeatChange = (hang, cot) => {
    const newSoCho = [...so_cho];
    const index = newSoCho.findIndex((s) => s === `${hang}${cot}`);
    if (index === -1) {
      newSoCho.push(`${hang}${cot}`);
    } else {
      newSoCho.splice(index, 1);
    }
    setSo_cho(newSoCho);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!ten_khach_hang.trim()) newErrors.ten_khach_hang = 'Vui lòng nhập tên khách hàng';
    if (!so_dien_thoai.trim()) newErrors.so_dien_thoai = 'Vui lòng nhập số điện thoại';
    if (so_cho.length === 0) newErrors.so_cho = 'Vui lòng chọn ít nhất một ghế';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    if (!window.confirm('Bạn có chắc chắn muốn đặt vé?')) return;

    try {
      // Đặt vé
      const bookingResponse = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_chuyen_xe: selectedTicket.ID,
          ten_khach_hang,
          so_dien_thoai,
          so_cho: so_cho.join(','),
        }),
      });

      if (!bookingResponse.ok) {
        const errorData = await bookingResponse.json();
        console.error('Error response:', errorData);
        alert(`Lỗi: ${errorData.message || 'Không thể đặt vé'}`);
        return;
      }

      // Tạo URL thanh toán
      const newPayment = {
        amount: selectedTicket.GIA_VE * so_cho.length,
        bankCode: null, // Let user choose the payment method
        language: "vn",
      };
      const paymentResponse = await axios.post('http://localhost:5000/api/v1/vnpay/create_payment_url', newPayment);

      if (paymentResponse.status === 200 && paymentResponse.data) {
        window.location.href = paymentResponse.data; // Điều hướng đến trang thanh toán
      } else {
        alert('Không thể tạo URL thanh toán');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert(`Đã xảy ra lỗi: ${error.message}`);
    }
  };

  const handleAddToCart = () => {
    if (!validateForm()) return;
  
    const cartItem = {
      id_chuyen_xe: selectedTicket.ID,
      ten_khach_hang,
      so_dien_thoai,
      so_cho: so_cho.join(','),
      gia: selectedTicket.GIA_VE,
      quantity: so_cho.length
    };
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));
  
    alert('Đã thêm vào giỏ hàng!');
    navigate('/cart');
  };

  const totalPrice = selectedTicket ? selectedTicket.GIA_VE * so_cho.length : 0;

  return (
    <div>
      <h1>Đặt Vé Chuyến Xe</h1>
      {selectedTicket && (
        <div>
          <p>Nơi Xuất Phát: {selectedTicket.DIEM_KHOI_HANH}</p>
          <p>Điểm Đến: {selectedTicket.DIEM_DEN}</p>
          <p>Giá: {selectedTicket.GIA_VE} VND</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Tên Khách"
            value={ten_khach_hang}
            onChange={(e) => setTen_khach_hang(e.target.value)}
            required
          />
          {errors.ten_khach_hang && <span className="error">{errors.ten_khach_hang}</span>}
        </div>
        <div>
          <input
            type="tel"
            placeholder="Số Điện Thoại"
            value={so_dien_thoai}
            onChange={(e) => setSo_dien_thoai(e.target.value)}
            required
          />
          {errors.so_dien_thoai && <span className="error">{errors.so_dien_thoai}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="so_cho">Ghế Ngồi:</label>
          <div className="seats">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((hang) => (
              <div key={hang} className="row">
                {['A', 'B', 'C'].map((cot) => (
                  <label key={`${hang}${cot}`} style={{ margin: '5px' }}>
                    <input
                      type="checkbox"
                      value={`${hang}${cot}`}
                      checked={so_cho.includes(`${hang}${cot}`)}
                      onChange={() => handleSeatChange(hang, cot)}
                    />
                    Ghế {hang}{cot}
                  </label>
                ))}
              </div>
            ))}
          </div>
          {errors.so_cho && <span className="error">{errors.so_cho}</span>}
        </div>
        <p>Tổng giá: {totalPrice} VND</p>
        <button type="submit" className="submit-btn">
          Đặt Vé
        </button>
        <button type="button" className="submit-btn" onClick={handleAddToCart}>
          Thêm vào giỏ hàng
        </button>
        <button type="button" className="submit-btn" onClick={() => navigate(-1)}>
          Quay lại
        </button>
      </form>
    </div>
  );
}

export default BookingForm;