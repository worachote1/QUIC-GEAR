const asyncHandler = require('express-async-handler');
const auctionProduct = require('../models/auctionProductsModel');

//@desc Get all auctionProduct data
//@route GET /api/auctionProducts

const getAllAuctionProducts = asyncHandler(async (req,res) => {
    const auctionProducts = await auctionProduct.find();
    res.status(200).json(auctionProducts);
});

//@desc Create new auctionProduct
//@route POST /api/auctionProducts/create

const createAuctionProducts = asyncHandler(async (req,res) => {
    try {
        const {startPrice, buyOutPrice, start_auction_date, end_auction_date, auctionStatus, createAt, productItem
        ,user_seller,userBidder} = req.body;

        if(!startPrice ||
            !buyOutPrice || !start_auction_date || !end_auction_date || !auctionStatus || !createAt
            || !productItem || !user_seller || !userBidder) {
                res.status(400).send("All data field must be valid");
            }
        
        //Create object from data
        const auctionProducts = await auctionProduct.create({
            startPrice,
            buyOutPrice,
            start_auction_date,
            end_auction_date,
            auctionStatus,
            createAt,
            productItem: req.body.productItem,
            user_seller: req.body.user_seller,
            userBidder: req.body.userBidder
        });

        res.status(200).json(auctionProducts);

    } catch(err) {
        console.log(err);
    }
});

//@desc Delete auctionProduct
//@route DELETE /api/auctionProducts/create/:id
const deleteAuctionProducts = asyncHandler(async (req,res) => {

    try {
        const auctionProductId = req.params.id;
        
        const deleteProductID = await auctionProduct.findById(auctionProductId);

        if(!deleteProductID) {
            return res.status(404).send(`Product ID not found!`);
        }

        await auctionProduct.findByIdAndDelete(auctionProductId);

        res.status(200).send({
            message: `Deleted ${auctionProductId} from database`
        });
    } catch(err) {
        console.log(err);
    }
});

//@desc Update auctionProduct
//@route PUT /api/auctionProducts/update/:id
const updateAuctionProducts = asyncHandler(async (req,res) => {
    try {
        const productId = req.params.id;

        const updateProductID = await auctionProduct.findByIdAndUpdate(
            {_id: productId},
            req.body,
            { new: true }
        );

        if(!updateProductID) {
            res.status(404).send(`Product ID not found!`);
        }

        res.status(200).send({
            message: `Updated auction product with ID ${productId}`,
            updateProductID
        });

    } catch(err) {
        console.log(err);
    }
});

//@desc Get auctionProducts by ID
//@route GET /api/auctionProducts/:id
const getAuctionProducts = asyncHandler(async (req,res) => {

    try {
        const auctionProductId = req.params.id;
    
        const existingAuctionProduct =  await auctionProduct.findById(auctionProductId);
        
        if(!existingAuctionProduct) {
            return res.status(404).send(`auctionProducts ID not found!`);
        }

        res.status(200).json(existingAuctionProduct);

    } catch(err) {
        console.log(err);
    }
});

module.exports = {
    getAllAuctionProducts, createAuctionProducts,deleteAuctionProducts,updateAuctionProducts, getAuctionProducts
};