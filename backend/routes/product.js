const express = require('express');
const router = express.Router();
const { getallProduct } = require('../controllers/productController');

router.route('/').get(getallProduct);

module.exports = router;