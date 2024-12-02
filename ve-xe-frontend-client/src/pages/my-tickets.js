import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../components/footer';

function Schedule() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get('/api/my-tickets');
      setTickets(response.data);
    } catch (error) {
      setError('Failed to fetch tickets');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTicket = async (ticketId) => {
    try {
      await axios.delete(`/api/delete-ticket/${ticketId}`);
      const updatedTickets = tickets.filter(ticket => ticket.id !== ticketId);
      setTickets(updatedTickets);
    } catch (error) {
      setError('Failed to delete ticket');
      console.error(error);
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
      <h1>Vé Của Tôi </h1>
      <table>
        <thead>
          <tr>
            <th>Schedule ID</th>
            <th>Tên</th>
            <th>Số điện thoại</th>
            <th>Seat</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket.id}>
              <td>{ticket.schedule_id}</td>
              <td>{ticket.name}</td>
              <td>{ticket.phone}</td>
              <td>{ticket.seat}</td>
              <td>
                <button onClick={() => handleDeleteTicket(ticket.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Footer />
    </div>
  );
}

export default Schedule;
