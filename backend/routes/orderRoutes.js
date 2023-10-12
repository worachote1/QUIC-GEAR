const express = require('express');
const router = express.Router();
const { getAllOrder, getSingleOrder, createOrder, deleteOrder, updateOrder } = require('../controllers/orderController');

router.route('/').get(getAllOrder);
router.route('/:id').get(getSingleOrder);
router.route('/create').post(createOrder);
router.route('/delete/:id').delete(deleteOrder);
router.route('/update/:id').put(updateOrder);

// export
module.exports = router;