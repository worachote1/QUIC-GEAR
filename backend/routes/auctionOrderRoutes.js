const express = require('express');
const router = express.Router();
const { getAllAuctionOrder, getSingleAuctionOrder, createAuctionOrder, deleteAuctionOrder, updateAuctionOrder } = require('../controllers/auctionOrderController');

router.route('/').get(getAllAuctionOrder);
router.route('/:id').get(getSingleAuctionOrder);
router.route('/create').post(createAuctionOrder);
router.route('/delete/:id').delete(deleteAuctionOrder);
router.route('/update/:id').put(updateAuctionOrder);

module.exports = router; 