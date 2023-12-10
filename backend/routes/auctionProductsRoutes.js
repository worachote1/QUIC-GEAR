const express = require('express');
const router = express.Router();
const { 
    getAllAuctionProducts, 
    getSingleAuctionProduct,
    getAuctionProductByUserSeller,
    getAuctionProductByWinner,
    getAuctionProductByBidder,
    createAuctionProducts, 
    deleteAuctionProducts,
    updateAuctionProducts
}= require('../controllers/auctionProductController');

router.route('/').get(getAllAuctionProducts);
router.route('/seller').get(getAuctionProductByUserSeller);
router.route('/winner').get(getAuctionProductByWinner);
router.route('/bidder').get(getAuctionProductByBidder);
router.route('/:id').get(getSingleAuctionProduct);
router.route('/create').post(createAuctionProducts);
router.route('/delete/:id').delete(deleteAuctionProducts);
router.route('/update/:id').put(updateAuctionProducts);

module.exports = router;