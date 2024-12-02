import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingForm from '../components/BookingForm';

function TicketList({ tickets, departure, destination, date }) {
  const navigate = useNavigate(); 
  const [showBookingForm, setShowBookingForm] = useState(false); // State quản lý hiển thị form
  const [selectedTicket, setSelectedTicket] = useState(null); // State lưu trữ thông tin vé được chọn

  if (!tickets || tickets.length === 0) {
    return (
      <div>
        <p>Không tìm thấy chuyến xe nào.</p>
        <button onClick={() => navigate('/')}>Quay lại</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Kết quả tìm kiếm từ {departure} đến {destination} vào ngày {date}</h2>
      <table>
        <thead>
          <tr>
            <th>Mã Chuyến Xe</th>
            <th>Điểm Khởi Hành</th>
            <th>Điểm Đến</th>
            <th>Thời Gian Khởi Hành</th>
            <th>Giá Vé</th>
            <th>Đặt Vé</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.ID}>
              <td>{ticket.ID}</td>
              <td>{ticket.DIEM_KHOI_HANH}</td>
              <td>{ticket.DIEM_DEN}</td>
              <td>{ticket.THOI_GIAN_KHOI_HANH}</td>
              <td>{ticket.GIA_VE} VND</td>
              <td>
                <button
                  onClick={() => {
                    setShowBookingForm(true); // Hiển thị form khi nút "Đặt Vé" được nhấn
                    setSelectedTicket(ticket); // Lưu thông tin vé được chọn
                  }}
                >
                  Chọn
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate('/')}>Quay lại</button>{' '}

{showBookingForm && (
  <BookingForm selectedTicket={selectedTicket} /> 
)}
</div>
  );
}

export default TicketList;