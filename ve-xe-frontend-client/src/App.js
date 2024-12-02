import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Ticket from './pages/Ticket';
import Booking from './pages/Booking';
import Register from './pages/Register';
import Login from './pages/Login';
import api from './services/api';
import BookingSuccessPage from './pages/booking-success';
import Cart from './pages/Cart';
import { CartProvider } from './components/CartContext';
import BookingForm from './components/BookingForm';
import Schedule from './pages/schedule';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsLoggedIn(true);
      api.get('/api/users')
        .then(response => {
          setUsername(response.data.TEN_DANG_NHAP);
        })
        .catch(error => {
          console.error('Failed to fetch user:', error);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <CartProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout} />} />
            <Route path="/tickets" element={<Ticket />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/booking-success" element={<BookingSuccessPage />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/booking-form" element={<BookingForm />} />
            <Route path="/schedule" element={<Schedule />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;