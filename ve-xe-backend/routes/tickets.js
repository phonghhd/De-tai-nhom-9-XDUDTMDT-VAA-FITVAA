const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Handle ticket search requests
router.get('/', (req, res) => {
  const { DIEM_KHOI_HANH, DIEM_DEN, THOI_GIAN_KHOI_HANH } = req.query;

  // Convert the date to YYYY-MM-DD format
  const formattedDate = new Date(THOI_GIAN_KHOI_HANH).toISOString().slice(0, 10);

  db.query(
    'SELECT * FROM chuyen_xe WHERE DIEM_KHOI_HANH = ? AND DIEM_DEN = ? AND DATE(THOI_GIAN_KHOI_HANH) = ?',
    [DIEM_KHOI_HANH, DIEM_DEN, formattedDate],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Ticket search failed', error: err });
      }
      res.json(results);
    }
  );
});


module.exports = router;

