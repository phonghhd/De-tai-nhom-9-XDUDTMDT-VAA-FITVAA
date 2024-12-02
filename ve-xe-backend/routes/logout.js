const express = require('express');
const router = require('.');
const app = express();

app.get('/logout', (req, res) => {
  // Xóa token khỏi session (nếu có)
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Lỗi khi đăng xuất');
    }

    // Chuyển hướng về trang chủ
    res.redirect('/');
  });
});

module.exports = router;
