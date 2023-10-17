const mongoose = require('mongoose');

const auctionOrderSchema = new mongoose.Schema({
    auctionID: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'auctionProducts'
    },
    auctionOrderStatus: {
        type: String,
        default: 'order received'
    },
})
   
module.exports = mongoose.model('auctionOrder', auctionOrderSchema); 