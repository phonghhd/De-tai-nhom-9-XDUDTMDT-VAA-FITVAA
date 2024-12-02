const express = require('express');
const db = require('../config/db');

const router = express.Router();

// Lấy thông tin người dùng dựa vào token (dùng JWT để xác thực)
router.get('/me', (req, res) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Giải mã token để lấy ID người dùng
  const decoded = jwt.verify(token, secretKey);

  db.query(
    'SELECT * FROM nguoi_dung WHERE ID = ?',
    [decoded.id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to fetch user', error: err });
      }
      res.json(results[0]);
    }
  );
});

module.exports = router;