const express = require('express');
const router = express.Router();
const { getAllAuctionProducts, getSingleAuctionProduct,createAuctionProducts, deleteAuctionProducts,updateAuctionProducts}= require('../controllers/auctionProductController');

router.route('/').get(getAllAuctionProducts);
router.route('/:id').get(getSingleAuctionProduct);
router.route('/create').post(createAuctionProducts);
router.route('/delete/:id').delete(deleteAuctionProducts);
router.route('/update/:id').put(updateAuctionProducts);
router.route('/:id').get(getAuctionProducts);

module.exports = router;