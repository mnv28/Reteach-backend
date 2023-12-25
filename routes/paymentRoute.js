const {getOrderId, paymentCallBack, paymentCancel, saveToDb} = require('../controller/paymentController');
const express = require('express');
const router = express();

router.post('/orders', getOrderId);
router.post('/payment-callback', paymentCallBack);
router.get('/payment-cancel', paymentCancel);
router.post('/payment',saveToDb)

module.exports = router;