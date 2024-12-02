const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Thêm sản phẩm vào giỏ hàng từ danh sách sản phẩm
router.post('/add-from-list', (req, res) => {
    const { nguoi_dung_id, chuyen_xe_id } = req.body;
    const so_luong = 1; // Mặc định số lượng là 1
    db.query(
        'SELECT * FROM gio_hang WHERE nguoi_dung_id = ? AND chuyen_xe_id = ?',
        [nguoi_dung_id, chuyen_xe_id],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Error checking cart' });
            }
            if (results.length > 0) {
                const newQuantity = results[0].so_luong + so_luong;
                db.query(
                    'UPDATE gio_hang SET so_luong = ? WHERE nguoi_dung_id = ? AND chuyen_xe_id = ?',
                    [newQuantity, nguoi_dung_id, chuyen_xe_id],
                    (err) => {
                        if (err) {
                            return res.status(500).json({ error: 'Error updating cart' });
                        }
                        res.status(200).json({ message: 'Product quantity updated' });
                    }
                );
            } else {
                db.query(
                    'INSERT INTO gio_hang (nguoi_dung_id, chuyen_xe_id, so_luong) VALUES (?, ?, ?)',
                    [nguoi_dung_id, chuyen_xe_id, so_luong],
                    (err) => {
                        if (err) {
                            return res.status(500).json({ error: 'Error adding to cart' });
                        }
                        res.status(200).json({ message: 'Product added to cart' });
                    }
                );
            }
z        }
    );
});

// Thêm sản phẩm vào giỏ hàng từ chi tiết sản phẩm
router.post('/add-from-details', (req, res) => {
    const { nguoi_dung_id, chuyen_xe_id, so_luong } = req.body;
    db.query(
        'SELECT * FROM gio_hang WHERE nguoi_dung_id = ? AND chuyen_xe_id = ?',
        [nguoi_dung_id, chuyen_xe_id],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Error checking cart' });
            }
            if (results.length > 0) {
                const newQuantity = results[0].so_luong + so_luong;
                db.query(
                    'UPDATE gio_hang SET so_luong = ? WHERE nguoi_dung_id = ? AND chuyen_xe_id = ?',
                    [newQuantity, nguoi_dung_id, chuyen_xe_id],
                    (err) => {
                        if (err) {
                            return res.status(500).json({ error: 'Error updating cart' });
                        }
                        res.status(200).json({ message: 'Product quantity updated' });
                    }
                );
            } else {
                db.query(
                    'INSERT INTO gio_hang (nguoi_dung_id, chuyen_xe_id, so_luong) VALUES (?, ?, ?)',
                    [nguoi_dung_id, chuyen_xe_id, so_luong],
                    (err) => {
                        if (err) {
                            return res.status(500).json({ error: 'Error adding to cart' });
                        }
                        res.status(200).json({ message: 'Product added to cart' });
                    }
                );
            }
        }
    );
});

module.exports = router;