// BookingComponent.js
import React, { useState } from 'react';
import axios from 'axios';

function BookingComponent() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '' });
  const [quantity, setQuantity] = useState(1);

  const searchTickets = async () => {
    const response = await axios.get('/api/tickets', { params: { diem_khoi_hanh: departure, diem_den: destination, ngay_di: date } });
    setTickets(response.data);
  };

  const bookTicket = async (ticketId) => {
    await axios.post('/api/bookings', { id_chuyen_xe: ticketId, ...customerInfo });
    window.location.href = '/payment';
  };

  const addToCart = async (ticketId) => {
    await axios.post('/api/giohang', { id_chuyen_xe: ticketId, so_cho: quantity });
    window.location.href = '/cart';
  };

  return (
    <div>
      <h2>Search Tickets</h2>
      <input type="text" placeholder="Departure" value={departure} onChange={(e) => setDeparture(e.target.value)} />
      <input type="text" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <button onClick={searchTickets}>Search</button>

      <h2>Available Tickets</h2>
      {tickets.length === 0 ? (
        <p>No tickets found</p>
      ) : (
        <ul>
          {tickets.map(ticket => (
            <li key={ticket.ID}>
              <span>{ticket.name} - {ticket.price}</span>
              <button onClick={() => setSelectedTicket(ticket)}>Select</button>
            </li>
          ))}
        </ul>
      )}

      {selectedTicket && (
        <div>
          <h3>Selected Ticket</h3>
          <p>{selectedTicket.name} - {selectedTicket.price}</p>
          <input type="text" placeholder="Name" value={customerInfo.name} onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })} />
          <input type="text" placeholder="Phone" value={customerInfo.phone} onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })} />
          <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          <button onClick={() => bookTicket(selectedTicket.ID)}>Book Now</button>
          <button onClick={() => addToCart(selectedTicket.ID)}>Add to Cart</button>
        </div>
      )}
    </div>
  );
}

export default BookingComponent;
