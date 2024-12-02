const express = require('express');
const db = require('../config/db');
const router = express.Router();
  
// Lấy danh sách sản phẩm
router.get('/', (req, res) => {
  const { DIEM_KHOI_HANH, DIEM_DEN, THOI_GIAN_KHOI_HANH } = req.query;
  db.query(
    'SELECT * FROM chuyen_xe WHERE DIEM_KHOI_HANH = ? AND DIEM_DEN = ? AND DATE(THOI_GIAN_KHOI_HANH) = ?',
    [DIEM_KHOI_HANH, DIEM_DEN, THOI_GIAN_KHOI_HANH],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to fetch products', error: err });
      }
      res.json(results);
    }
  );
});


// Thêm sản phẩm
router.post('/', (req, res) => {
  const { DIEM_KHOI_HANH, DIEM_DEN, THOI_GIAN_KHOI_HANH, NGAY_VE, GIA_VE } =
    req.body;
  db.query(
    'INSERT INTO chuyen_xe (DIEM_KHOI_HANH, DIEM_DEN, THOI_GIAN_KHOI_HANH, NGAY_VE, GIA_VE) VALUES (?, ?, ?, ?, ?)',
    [DIEM_KHOI_HANH, DIEM_DEN, THOI_GIAN_KHOI_HANH, NGAY_VE, GIA_VE],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json({
        id: results.insertId,
        DIEM_KHOI_HANH,
        DIEM_DEN,
        THOI_GIAN_KHOI_HANH,
        NGAY_VE,
        GIA_VE,
      });
    }
  );
});

// Sửa sản phẩm
router.put('/:id', (req, res) => {
  const { DIEM_KHOI_HANH, DIEM_DEN, THOI_GIAN_KHOI_HANH, NGAY_VE, GIA_VE } =
    req.body;
  db.query(
    'UPDATE chuyen_xe SET DIEM_KHOI_HANH = ?, DIEM_DEN = ?, THOI_GIAN_KHOI_HANH = ?, NGAY_VE = ?, GIA_VE = ? WHERE ID = ?',
    [DIEM_KHOI_HANH, DIEM_DEN, THOI_GIAN_KHOI_HANH, NGAY_VE, GIA_VE, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Product updated' });
    }
  );
});

// Xóa sản phẩm
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM chuyen_xe WHERE ID = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Product deleted' });
  });
});

module.exports = router;
