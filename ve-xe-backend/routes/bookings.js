const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/', async (req, res) => {
  const { id_chuyen_xe, ten_khach_hang, so_dien_thoai, so_cho } = req.body;

  if (!id_chuyen_xe || !ten_khach_hang || !so_dien_thoai || !so_cho) {
    return res.status(400).json({ message: 'Thiếu thông tin đặt vé' });
  }

  try {
    console.log('Received booking request:', req.body);
    const query = `
      INSERT INTO dat_ve (ID_CHUYEN_XE, TEN_KHACH_HANG, SO_DIEN_THOAI, NGAY_DAT)
      VALUES (?, ?, ?, NOW())
    `;
    const result = await db.execute(query, [id_chuyen_xe, ten_khach_hang, so_dien_thoai]);
    console.log('Booking inserted into dat_ve:', result);

    const seatQuery = `
      INSERT INTO dat_cho (ID_CHUYEN_XE, TEN_KHACH_HANG, SO_DIEN_THOAI, NGAY_DAT, SO_CHO)
      VALUES (?, ?, ?, NOW(), ?)
    `;
    await db.execute(seatQuery, [id_chuyen_xe, ten_khach_hang, so_dien_thoai, so_cho]);

    res.status(201).json({ message: 'Đặt vé thành công' });
  } catch (error) {
    console.error('Error in booking:', error);
    res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
});

module.exports = router;

