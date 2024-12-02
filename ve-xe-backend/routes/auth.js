const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const router = express.Router();
const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');

// Đăng ký 
router.post('/register', async (req, res) => {
  const { username, password, ho_ten, email, so_dien_thoai } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    'INSERT INTO nguoi_dung (HO_TEN, TEN_DANG_NHAP, MAT_KHAU, EMAIL, SO_PHONE) VALUES (?, ?, ?, ?, ?)',
    [ho_ten, username, hashedPassword, email, so_dien_thoai],
    (err) => {
      if (err) {
        return res.status(500).json({ message: 'Registration failed', error: err });
      }
      res.status(201).json({ message: 'User registered successfully' });
    }
  );
});

// Đăng nhập 
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM nguoi_dung WHERE TEN_DANG_NHAP = ?', [username], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }
    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.MAT_KHAU); // So sánh mật khẩu
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }
    const token = jwt.sign({ id: user.ID, username: user.TEN_DANG_NHAP }, secretKey, { expiresIn: '1h' }); 
    res.json({ message: 'Login successful', token });
  });
});

module.exports = router; 
