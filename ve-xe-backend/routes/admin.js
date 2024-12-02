const express = require("express");
const router = express.Router();
const db = require('../config/db');

// API để lấy danh sách người dùng
router.get("/users", (req, res) => {
  const query = "SELECT * FROM nguoi_dung";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

// API để tạo người dùng
router.post("/users", (req, res) => {
  const { ten_dang_nhap, email, mat_khau, vai_tro } = req.body;
  if (!ten_dang_nhap || !email || !mat_khau || !vai_tro) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const query = "INSERT INTO nguoi_dung (ten_dang_nhap, email, mat_khau, vai_tro) VALUES (?, ?, ?, ?)";
  db.query(query, [ten_dang_nhap, email, mat_khau, vai_tro], (err, result) => {
    if (err) {
      console.error("Error creating user:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(201).json({ id: result.insertId, ten_dang_nhap, email, vai_tro });
    }
  });
});

// API để chỉnh sửa người dùng
router.put("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const { ten_dang_nhap, email, vai_tro } = req.body;
  if (!ten_dang_nhap || !email || !vai_tro) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const query = "UPDATE nguoi_dung SET ten_dang_nhap = ?, email = ?, vai_tro = ? WHERE id = ?";
  db.query(query, [ten_dang_nhap, email, vai_tro, userId], (err, result) => {
    if (err) {
      console.error("Error updating user:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json({ id: userId, ten_dang_nhap, email, vai_tro });
    }
  });
});

// API để xóa người dùng
router.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const query = "DELETE FROM nguoi_dung WHERE id = ?";
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error("Error deleting user:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(204).send();
    }
  });
});

// API để lấy danh sách chuyến xe
router.get("/trips", (req, res) => {
  const query = "SELECT * FROM chuyen_xe";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching trips:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

// API để tạo chuyến xe mới
router.post("/trips", (req, res) => {
  const { diem_di, diem_den, ngay, gia, so_ghe_trong } = req.body;
  if (!diem_di || !diem_den || !ngay || !gia || !so_ghe_trong) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const query = "INSERT INTO chuyen_xe (diem_di, diem_den, ngay, gia, so_ghe_trong) VALUES (?, ?, ?, ?, ?)";
  db.query(query, [diem_di, diem_den, ngay, gia, so_ghe_trong], (err, result) => {
    if (err) {
      console.error("Error creating trip:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(201).json({ id: result.insertId, diem_di, diem_den, ngay, gia, so_ghe_trong });
    }
  });
});

// API để chỉnh sửa chuyến xe
router.put("/trips/:id", (req, res) => {
  const tripId = parseInt(req.params.id);
  const { diem_di, diem_den, ngay, gia, so_ghe_trong } = req.body;
  if (!diem_di || !diem_den || !ngay || !gia || !so_ghe_trong) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const query = "UPDATE chuyen_xe SET diem_di = ?, diem_den = ?, ngay = ?, gia = ?, so_ghe_trong = ? WHERE id = ?";
  db.query(query, [diem_di, diem_den, ngay, gia, so_ghe_trong, tripId], (err, result) => {
    if (err) {
      console.error("Error updating trip:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: "Trip not found" });
    } else {
      res.json({ id: tripId, diem_di, diem_den, ngay, gia, so_ghe_trong });
    }
  });
});

// API để xóa chuyến xe
router.delete("/trips/:id", (req, res) => {
  const tripId = parseInt(req.params.id);
  const query = "DELETE FROM chuyen_xe WHERE id = ?";
  db.query(query, [tripId], (err, result) => {
    if (err) {
      console.error("Error deleting trip:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: "Trip not found" });
    } else {
      res.status(204).send();
    }
  });
});

// API để lấy danh sách đặt chỗ
router.get("/bookings", (req, res) => {
  const query = "SELECT * FROM dat_cho";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching bookings:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

// API để tạo đặt chỗ mới
router.post("/bookings", (req, res) => {
  const { id_chuyen_xe, ten_khach_hang, so_dien_thoai, so_cho } = req.body;
  if (!id_chuyen_xe || !ten_khach_hang || !so_dien_thoai || !so_cho) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const query = "INSERT INTO dat_cho (id_chuyen_xe, ten_khach_hang, so_dien_thoai, so_cho) VALUES (?, ?, ?, ?)";
  db.query(query, [id_chuyen_xe, ten_khach_hang, so_dien_thoai, so_cho], (err, result) => {
    if (err) {
      console.error("Error creating booking:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(201).json({ id: result.insertId, id_chuyen_xe, ten_khach_hang, so_dien_thoai, so_cho });
    }
  });
});

// API để chỉnh sửa đặt chỗ
router.put("/bookings/:id", (req, res) => {
  const bookingId = parseInt(req.params.id);
  const { id_chuyen_xe, ten_khach_hang, so_dien_thoai, so_cho } = req.body;
  if (!id_chuyen_xe || !ten_khach_hang || !so_dien_thoai || !so_cho) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const query = "UPDATE dat_cho SET id_chuyen_xe = ?, ten_khach_hang = ?, so_dien_thoai = ?, so_cho = ? WHERE id = ?";
  db.query(query, [id_chuyen_xe, ten_khach_hang, so_dien_thoai, so_cho, bookingId], (err, result) => {
    if (err) {
      console.error("Error updating booking:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: "Booking not found" });
    } else {
      res.json({ id: bookingId, id_chuyen_xe, ten_khach_hang, so_dien_thoai, so_cho });
    }
  });
});

// API để xóa đặt chỗ
router.delete("/bookings/:id", (req, res) => {
  const bookingId = parseInt(req.params.id);
  const query = "DELETE FROM dat_cho WHERE id = ?";
  db.query(query, [bookingId], (err, result) => {
    if (err) {
      console.error("Error deleting booking:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: "Booking not found" });
    } else {
      res.status(204).send();
    }
  });
});
module.exports = router;
