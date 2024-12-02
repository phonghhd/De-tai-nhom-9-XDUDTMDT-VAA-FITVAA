const express = require('express');
const crypto = require('crypto');
const moment = require('moment');
const querystring = require('qs');
const config = require('config');
const router = express.Router();

const vnp_TmnCode = config.get('vnp_TmnCode');
const vnp_HashSecret = config.get('vnp_HashSecret');
const vnp_Url = config.get('vnp_Url');
const returnUrl = config.get('vnp_ReturnUrl');

// Tạo URL thanh toán và tạo đơn hàng
router.post('/create_payment_url', function (req, res) {
    process.env.TZ = 'Asia/Ho_Chi_Minh';
    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');
    let ipAddr =
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    let orderId = moment(date).format('DDHHmmss');
    let amount = req.body.amount;
    let bankCode = req.body.bankCode;
    let locale = req.body.language;
    if (locale === null || locale === '') {
        locale = 'vn';
    }

    let currCode = 'VND';

    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = vnp_TmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = `Thanh toan cho ma GD: ${orderId}`;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode !== null && bankCode !== '') {
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    let signData = querystring.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac('sha512', vnp_HashSecret);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
    vnp_Params['vnp_SecureHash'] = signed;
    let vnpUrl = vnp_Url + '?' + querystring.stringify(vnp_Params, { encode: false });

    // Gửi URL về frontend chuyển hướng đến VNPay
    res.send(vnpUrl);
});

const redirectToPaymentSuccessPage = (status) => `
<html>
    <head>
        <meta http-equiv="refresh" content="0; url=http://localhost:3000/payment-${status}" />
    </head>
    <body>
        <p>Redirecting to payment ${status} page...</p>
    </body>
</html>
`;

// URL thông báo kết quả thanh toán và cập nhật trạng thái thanh toán đơn hàng
router.get('/vnpay_return', function (req, res, next) {
    let vnp_Params = req.query;

    let secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    let signData = querystring.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac('sha512', vnp_HashSecret);let signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

    if (secureHash === signed) {
        const transactionStatus = vnp_Params['vnp_TransactionStatus'];
        if (transactionStatus === '00') {
            res.status(200).send(redirectToPaymentSuccessPage('success'));
        } else {
            res.status(200).send(redirectToPaymentSuccessPage('error'));
        }
    } else {
        res.status(200).send(redirectToPaymentSuccessPage('error'));
    }
});

// IPN URL cập nhật kết quả thanh toán
router.post('/vnpay_ipn', (req, res) => {
    const vnp_Params = req.body;
    const secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    const signData = querystring.stringify(vnp_Params, { encode: false });
    const checkSum = crypto.createHmac('sha256', vnp_HashSecret).update(signData).digest('hex');

    if (secureHash === checkSum) {
        const transactionStatus = vnp_Params['vnp_TransactionStatus'];
        if (transactionStatus === '00') {
            res.json({ message: 'Xác nhận giao dịch thành công', data: vnp_Params });
        } else {
            res.status(400).json({ message: 'Giao dịch thất bại', data: vnp_Params });
        }
    } else {
        res.status(400).json({ message: 'Chữ ký không hợp lệ', data: vnp_Params });
    }
});

function sortObject(obj) {
    let sorted = {};
    let keys = Object.keys(obj).sort();
    keys.forEach((key) => {
        sorted[key] = obj[key];
    });
    return sorted;
}

module.exports = router;