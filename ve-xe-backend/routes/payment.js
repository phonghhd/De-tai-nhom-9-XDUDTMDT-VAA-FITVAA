const express = require('express');
const crypto = require('crypto');
const querystring = require('qs');
const router = express.Router();

// Thay thế bằng các thông tin API và key thực tế của VNPAY
const vnp_TmnCode = '8A0U66ZN';
const vnp_HashSecret = '9RP7QJ0LDOG4HHJ7OGPMS4D27NAFOE67';
const vnp_Url = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'; // Sử dụng URL phù hợp với môi trường của bạn
const returnUrl = 'http://localhost:3000/order/vnpay_return'; // URL kết quả thanh toán

// Tạo URL thanh toán và tạo đơn hàng
router.post('/create_payment_url', async (req, res) => {
  const { amount, bankCode, language } = req.body;

  const paymentData = {
    vnp_Version: '2.1.0',
    vnp_Command: 'pay',
    vnp_TmnCode: vnp_TmnCode,
    vnp_Amount: amount * 100,
    vnp_CurrCode: 'VND',
    vnp_TxnRef: Date.now().toString(),
    vnp_OrderInfo: 'Thanh toan don hang',
    vnp_OrderType: 'billpayment',
    vnp_Locale: language,
    vnp_ReturnUrl: returnUrl,
    vnp_IpAddr: req.ip,
    vnp_CreateDate: new Date().toISOString().slice(0, 19).replace(/-/g, '').replace(/:/g, '').replace('T', '')
  };

  paymentData['vnp_SecureHashType'] = 'SHA256';
  paymentData['vnp_SecureHash'] = crypto.createHmac('sha256', vnp_HashSecret).update(querystring.stringify(paymentData)).digest('hex');
  const paymentUrl = `${vnp_Url}?${querystring.stringify(paymentData)}`;

  res.json(paymentUrl);
});

// URL thông báo kết quả thanh toán và cập nhật trạng thái thanh toán đơn hàng
router.get('/vnpay_return', (req, res) => {
  const vnp_Params = req.query;
  const secureHash = vnp_Params['vnp_SecureHash'];

  delete vnp_Params['vnp_SecureHash'];
  delete vnp_Params['vnp_SecureHashType'];

  const signData = querystring.stringify(vnp_Params, { encode: false });
  const checkSum = crypto.createHmac('sha256', vnp_HashSecret).update(signData).digest('hex');

  if (secureHash === checkSum) {
    const transactionStatus = vnp_Params['vnp_TransactionStatus'];
    if (transactionStatus === '00') {
      res.json({ message: 'Giao dịch thành công', data: vnp_Params });
    } else {
      res.status(400).json({ message: 'Giao dịch thất bại', data: vnp_Params });
    }
  } else {
    res.status(400).json({ message: 'Chữ ký không hợp lệ', data: vnp_Params });
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
    if (transactionStatus === '00') {res.json({ message: 'Xác nhận giao dịch thành công', data: vnp_Params });
  } else {
    res.status(400).json({ message: 'Giao dịch thất bại', data: vnp_Params });
  }
} else {
  res.status(400).json({ message: 'Chữ ký không hợp lệ', data: vnp_Params });
}
});

module.exports = router;