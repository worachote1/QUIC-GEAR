const express = require('express');
const router = express.Router();
const { genPromtpayQR } = require('../controllers/topupController');

router.route('/').post(genPromtpayQR);

module.exports = router;