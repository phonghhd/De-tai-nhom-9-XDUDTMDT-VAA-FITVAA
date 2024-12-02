const express = require('express');
const db = require('../config/db');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const router = express.Router();

// Lấy danh sách vé đã đặt
router.get('/', (req, res) => {
  db.query('SELECT * FROM dat_cho', (err, results) => {
    if (err) {
      console.error('Error fetching bookings:', err);
      return res.status(500).json({ message: 'Failed to fetch bookings', error: err });
    }
    res.json(results);
  });
});

router.post('/', async (req, res) => {
  const { id_chuyen_xe, ten_khach_hang, so_dien_thoai, so_cho } = req.body;

  try {
    if (!id_chuyen_xe || !ten_khach_hang || !so_dien_thoai || !so_cho) {
      console.error('Missing required information:', { id_chuyen_xe, ten_khach_hang, so_dien_thoai, so_cho });
      return res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
    }

    const result = await db.query('INSERT INTO dat_cho (ID_CHUYEN_XE, TEN_KHACH_HANG, SO_DIEN_THOAI, SO_CHO) VALUES (?, ?, ?, ?)', [id_chuyen_xe, ten_khach_hang, so_dien_thoai, so_cho]);

    if (result[0].affectedRows > 0) {
      console.log('Ticket booked successfully:', result);
      res.status(201).json({ message: 'Đặt vé thành công!', data: { id: result[0].insertId } });
    } else {
      throw new Error('Không thể đặt vé');
    }
  } catch (error) {
    console.error('Error booking ticket:', error);
    res.status(500).json({ message: 'Lỗi đặt vé!', error: error.message });
  }
});

app.use('/api/bookings', router);

module.exports = app;