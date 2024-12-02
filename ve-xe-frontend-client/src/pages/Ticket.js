import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TicketList from '../components/TicketList';
import Footer from '../components/footer';

function Ticket() {
  const [tickets, setTickets] = useState([]);
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const departure = localStorage.getItem('departure');
    const destination = localStorage.getItem('destination');
    const date = localStorage.getItem('date');

    console.log('Local Storage Values:', { departure, destination, date });

    setDeparture(departure);
    setDestination(destination);
    setDate(date);

    handleSearch(departure, destination, date);
  }, []);


  const handleSearch = async (departure, destination, date) => {
    console.log('Parameters:', { departure, destination, date });
    if (!departure || !destination || !date) {
      console.error('Missing search parameters');
      return;
    }

    const apiUrl = `http://localhost:5000/api/vexe?DIEM_KHOI_HANH=${encodeURIComponent(departure)}&DIEM_DEN=${encodeURIComponent(destination)}&THOI_GIAN_KHOI_HANH=${encodeURIComponent(date)}`;
    try {
      const response = await axios.get(apiUrl);
      console.log('Response:', response.data);
      setTickets(response.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };


  return (
    <div>
      <div className="search-form">
      <h1>Tìm Kiếm Chuyến Xe</h1>
      </div>
      {/* <div className="search-form">
        <input 
          type="text" 
          placeholder="Điểm Khởi Hành" 
          value={departure} 
          onChange={(e) => setDeparture(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Điểm Đến" 
          value={destination} 
          onChange={(e) => setDestination(e.target.value)} 
        />
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
        />
        <button onClick={() => handleSearch(departure, destination, date)}>Tìm Kiếm</button> 
      </div> */}

      <TicketList tickets={tickets} departure={departure} destination={destination} date={date} />
      <Footer />
    </div>
  );
}

export default Ticket;

