import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookingSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Đặt vé thành công!</h1>
      <button onClick={() => navigate('/')}>Quay lại trang chủ</button>
    </div>
  );
};

export default BookingSuccessPage;