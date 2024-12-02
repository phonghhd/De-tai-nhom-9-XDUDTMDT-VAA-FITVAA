  const express = require('express');
  const cors = require('cors');
  const bodyParser = require('body-parser');
  const authRoutes = require('./routes/auth');
  const ticketRoutes = require('./routes/tickets');
  const bookingRoutes = require('./routes/bookings');
  const productsRoutes = require('./routes/products');
  const cartRoutes = require('./routes/cart')
  const userRoutes = require('./routes/users');
  const adminRoutes = require('./routes/admin');
  const vnpay = require('./routes/vnpay')
  const MyTickets = require('./routes/my-tickets')
  const app = express();
  const PORT = 5000;

  // Middleware
  app.use(cors());
  app.use(bodyParser.json());

  // Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/tickets', ticketRoutes);
  app.use('/api/bookings', bookingRoutes);
  app.use('/api/vexe', productsRoutes);
  app.use('/api/giohang', cartRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/v1/vnpay', vnpay);
  app.use('/api/my-tickets', MyTickets);
  // Khởi động server
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
