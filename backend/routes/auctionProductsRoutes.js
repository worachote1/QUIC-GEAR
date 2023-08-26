const express = require('express');
const router = express.Router();
const { getAllAuctionProducts, createAuctionProducts, deleteAuctionProducts,updateAuctionProducts}= require('../controllers/auctionProductController');

router.route('/').get(getAllAuctionProducts);
router.route('/create').post(createAuctionProducts);
router.route('/delete/:id').delete(deleteAuctionProducts);
router.route('/update/:id').put(updateAuctionProducts);

module.exports = router;