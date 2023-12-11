const asyncHandler = require('express-async-handler');
const auctionProduct = require('../models/auctionProductsModel');

//@desc Get all auctionProduct data
//@route GET /api/auctionProducts

const getAllAuctionProducts = asyncHandler(async (req, res) => {
    const auctionProducts = await auctionProduct.find().populate('user_seller').populate('userBidder.userId').populate('userWinner.userId');
    res.status(200).json(auctionProducts);
});

//@desc Get single auctionProduct by id
//@route GET /api/auctionProducts/:id
const getSingleAuctionProduct = asyncHandler(async (req, res) => {
    try {
        const auctionProductId = req.params.id;

        const targetAuctionProduct = await auctionProduct.findById(auctionProductId).populate('user_seller').populate('userBidder.userId').populate('userWinner.userId');

        if (!targetAuctionProduct) {
            return res.status(404).send('Auction ID not found!');
        }

        res.status(200).json(targetAuctionProduct);

    } catch (err) {
        console.log(err);
    }
});

//@desc Get single auctionProduct by user_seller
//@route GET api/auctionProducts/seller?user_seller=user_seller_id
const getAuctionProductByUserSeller = asyncHandler(async (req, res) => {
    try {
        //pass the user_seller ID in the request query
        const { user_seller } = req.query;
        console.log('User Seller ID:', user_seller);
        let query = {};

        // If user_seller is provided, add it to the query
        if (user_seller) {
            query.user_seller = user_seller;
        }
        console.log("seller query prn")
        console.log(query)
        const auctionProducts = await auctionProduct.find(query)
            .populate('user_seller')
            .populate('userBidder.userId')
            .populate('userWinner.userId');

        res.status(200).json(auctionProducts);
    } catch (err) {
        console.log(err);
    }
});

//@desc Get single auctionProduct by userWinner
//@route GET /api/auctionProducts/winner?userWinner=user_winner_id
const getAuctionProductByWinner = asyncHandler(async (req, res) => {
    try {
        const { userWinner } = req.query;

        const auctionProducts = await auctionProduct.find({
            'userWinner.userId': userWinner,
        }).populate('user_seller').populate('userBidder.userId').populate('userWinner.userId');

        res.status(200).json(auctionProducts);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//@desc Get single auctionProduct by userBidder
//@route GET /api/auctionProducts/bidder?userBidder=user_bidder_id
const getAuctionProductByBidder = asyncHandler(async (req, res) => {
    try {
        const { userBidder } = req.query;

        let query = {};

        // If userBidder is provided, add it to the query
        if (userBidder) {
            query['userBidder.userId'] = userBidder;
        }

        const auctionProducts = await auctionProduct.find(query)
            .populate('user_seller')
            .populate('userBidder.userId')
            .populate('userWinner.userId');

        res.status(200).json(auctionProducts);
    } catch (err) {
        console.log(err);
    }
});

//@desc Create new auctionProduct
//@route POST /api/auctionProducts/create
const createAuctionProducts = asyncHandler(async (req, res) => {
    try {
        const auctionProducts = await auctionProduct.create(req.body);
        res.status(200).json(auctionProducts);

    } catch (err) {
        console.log(err);
    }
});

//@desc Delete auctionProduct
//@route DELETE /api/auctionProducts/create/:id
const deleteAuctionProducts = asyncHandler(async (req, res) => {

    try {
        const auctionProductId = req.params.id;

        const deleteProductID = await auctionProduct.findById(auctionProductId);

        if (!deleteProductID) {
            return res.status(404).send(`Product ID not found!`);
        }

        await auctionProduct.findByIdAndDelete(auctionProductId);

        res.status(200).send({
            message: `Deleted ${auctionProductId} from database`
        });
    } catch (err) {
        console.log(err);
    }
});

//@desc Update auctionProduct
//@route PUT /api/auctionProducts/update/:id
const updateAuctionProducts = asyncHandler(async (req, res) => {
    try {
        const productId = req.params.id;

        const updateProductID = await auctionProduct.findByIdAndUpdate(
            { _id: productId },
            req.body,
            { new: true }
        );

        if (!updateProductID) {
            res.status(404).send(`Product ID not found!`);
        }

        const populatedProduct = await auctionProduct.findById(updateProductID._id)
            .populate('user_seller')
            .populate('userBidder.userId')
            .populate('userWinner.userId');
        req.io.to(`auction_${productId}`).emit('currentBid', populatedProduct.startPrice);
        res.status(200).json(populatedProduct);
    } catch (err) {
        console.log(err);
    }
});

module.exports = {
    getAllAuctionProducts, 
    getSingleAuctionProduct, 
    getAuctionProductByUserSeller, 
    getAuctionProductByWinner, 
    getAuctionProductByBidder,
    createAuctionProducts, 
    deleteAuctionProducts, 
    updateAuctionProducts
};