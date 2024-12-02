import React from 'react';
import BookingForm from '../components/BookingForm';
import { useLocation } from 'react-router-dom'; // Thêm useLocation

function Booking() {
  const location = useLocation();
  const selectedTicket = location.state.selectedTicket; // Lấy thông tin vé đã chọn

  return (
    <div>
      {selectedTicket ? (
        <BookingForm selectedTicket={selectedTicket} /> 
      ) : (
        // Hiển thị thông báo nếu chưa chọn vé
        <div className="container">
          <p>Vui lòng chọn vé xe trước khi đặt vé.</p>
        </div>
      )}
    </div>
  );
}

export default Booking;