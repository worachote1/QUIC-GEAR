const asyncHandler = require('express-async-handler');
const order = require('../models/auctionOrderModel');

// Get all orders => GET api/orders
const getAllAuctionOrder = asyncHandler(async (req, res) => {
    const orders = await order.find().populate('auctionID');
    res.status(200).json(orders);
}); 

// Get single order => GET api/orders/:id
//Test
const getSingleAuctionOrder = asyncHandler(async (req, res) => {
    try {
        const orderId = req.params.id;

        const targetOrder = await order.findById(orderId).populate('auctionID');

        if(!targetOrder) {
            return res.status(404).send('Order ID not found!');
        }

        res.status(200).json(targetOrder);

    } catch(err) {
        console.log(err);
    }
});

// Create new order => POST api/orders/create
const createAuctionOrder = asyncHandler(async (req, res) => {
    try {
        const orders = await order.create(req.body)
        res.status(200).json(orders);
    } catch(err) {
        console.log(err);
    }
});

// Delete order => DELETE api/orders/delete/:id
const deleteAuctionOrder = asyncHandler(async (req, res) => {
    try {
        const orderId = req.params.id;

        const deleteOrderId = await order.findById(orderId);

        if(!deleteOrderId) {
            return res.status(404).send('Order ID not found!');
        }

        await order.findByIdAndDelete(orderId);

        res.status(200).send({
            message: `Deleted ${orderId} from database`
        });
    } catch(err) {
        console.log(err);
    }
});

// Update order => api/orders/update/:id
const updateAuctionOrder = asyncHandler(async (req, res) => {
    let orders = await order.findById(req.params.id);

    if(!orders) {
        return res.status(404).send('Order not found!');
    }

    orders = await order.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(orders)
});
module.exports = { getAllAuctionOrder, getSingleAuctionOrder, createAuctionOrder, deleteAuctionOrder, updateAuctionOrder };