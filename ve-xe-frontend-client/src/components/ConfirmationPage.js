import React from 'react';
import { useLocation } from 'react-router-dom';

function ConfirmationPage() {
  const location = useLocation();
  const bookingData = location.state?.bookingData; // Nhận dữ liệu từ location.state

  if (!bookingData) {
    return <p>Không tìm thấy thông tin đặt vé.</p>;
  }

  return (
    <div>
      <h1>Xác nhận đặt vé</h1>
      <p>Tên khách hàng: {bookingData.ten_khach_hang}</p>
      <p>Số điện thoại: {bookingData.so_dien_thoai}</p>
      <p>Số ghế: {bookingData.so_cho}</p>
      {/* Hiển thị các thông tin khác ... */}
    </div>
  );
}

export default ConfirmationPage;