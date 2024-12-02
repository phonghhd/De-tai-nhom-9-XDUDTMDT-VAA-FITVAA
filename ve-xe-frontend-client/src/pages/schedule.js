import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../components/footer';

function Schedule() {
  const [schedules, setSchedules] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [booking, setBooking] = useState({ schedule_id: '', name: '', phone: '', seat: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSchedules();
    fetchTickets();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get('/api/vexe');
      setSchedules(response.data);
    } catch (err) {
      setError('Failed to fetch schedules');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTickets = async () => {
    try {
      const response = await axios.get('/api/tickets');
      setTickets(response.data);
    } catch (err) {
      setError('Failed to fetch tickets');
      console.error(err);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      console.log('Booking:', booking);
      const response = await axios.post('/api/bookings', { ...booking, seat: booking.seat });
      console.log('Booking response:', response);
      setBooking({ schedule_id: '', name: '', phone: '', seat: '' });
      fetchTickets();
    } catch (err) {
      console.error('Failed to book ticket:', err);
      setError('Failed to book ticket');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h1>Lịch Trình Đặt Vé Xe</h1>
      <table>
        <thead>
          <tr>
            <th>Điểm Đến</th>
            <th>Thời Gian Khởi Hành</th>
            <th>Giá Vé</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map(schedule => (
            <tr key={schedule.id}>
              <td>{schedule.destination}</td>
              <td>{schedule.departure_time}</td>
              <td>{schedule.price.toLocaleString()} VNĐ</td>
              <td>
                <button onClick={() => setBooking({ ...booking, schedule_id: schedule.id })}>Đặt Vé</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {booking.schedule_id && (
        <div>
          <h2>Thông Tin Đặt Vé</h2>
          <form onSubmit={handleBooking}>
            <input type="hidden" value={booking.schedule_id} />
            <label>Họ và Tên:</label>
            <input type="text" required onChange={(e) => setBooking({ ...booking, name: e.target.value })} />
            <br />
            <label>Số Điện Thoại:</label>
            <input type="text" required onChange={(e) => setBooking({ ...booking, phone: e.target.value })} />
            <br />
            <label>Số Ghế:</label>
            <input type="number" required min={1} max={4} onChange={(e) => setBooking({ ...booking, seat: e.target.value })} />
            <br />
            <button type="submit">Xác Nhận Đặt Vé</button>
          </form>
        </div>
      )}

      <h2>Danh Sách Vé Đã Đặt</h2>
      <table>
        <thead>
          <tr>
            <th>Họ và Tên</th>
            <th>Số Điện Thoại</th>
            <th>Điểm Đến</th>
            <th>Thời Gian Khởi Hành</th>
            <th>Giá Vé</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, index) => (
            <tr key={index}>
              <td>{ticket.name}</td>
              <td>{ticket.phone}</td>
              <td>{ticket.destination}</td>
              <td>{ticket.departure_time}</td>
              <td>{ticket.price.toLocaleString()} VNĐ</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Footer />
    </div>
  );
}

export default Schedule;
