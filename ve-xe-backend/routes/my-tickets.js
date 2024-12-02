const express = require('express');
const db = require('../config/db');
const router = express.Router();
const checkAuth = (req, res, next) => {
    if (!req.session.user_id) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
};

// Lấy danh sách vé đã đặt
router.get('/api/my-tickets', checkAuth, async (req, res) => {
    const user_id = req.session.user_id;
    const { status, date } = req.query;

    let sql = "SELECT * FROM DAT_CHO WHERE USER_ID = ?";
    const queryParams = [user_id];

    if (status) {
        sql += " AND TRANG_THAI = ?";
        queryParams.push(status);
    }

    if (date) {
        sql += " AND DATE(NGAY_DAT) = ?";
        queryParams.push(date);
    }
    try {
        const [rows] = await db.query(sql, queryParams);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tickets' });
    }
});

// Xóa vé
router.delete('/api/delete-ticket/:id', checkAuth, async (req, res) => {
    const ticketId = req.params.id;
    const user_id = req.session.user_id;
    try {
        const [result] = await db.query("DELETE FROM DAT_CHO WHERE ID = ? AND USER_ID = ?", [ticketId, user_id]);
        if (result.affectedRows > 0) {
            res.json({ message: 'success' });
        } else {
            res.status(404).json({ message: 'Ticket not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting ticket' });
    }
});

module.exports = router;