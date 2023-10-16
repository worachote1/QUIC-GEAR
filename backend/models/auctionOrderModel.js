const mongoose = require('mongoose');

const auctionOrderSchema = new mongoose.Schema({
    auctionID: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'auctionProducts'
    },
    auctionOrderStatus: {
        type: String,
        default: ''
    },
})
   
module.exports = mongoose.model('auctionOrder', auctionOrderSchema); 