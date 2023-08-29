const mongoose = require('mongoose');

const auctionProductSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true  
    },
    idSeller: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    currentPrice: {
        type: Number,
        required: true
    },
    startPrice: {
        type: Number,
        required: true
    },
    buyOutPrice: {
        type: Number,
        required: true
    },
    imgPath: {
        type: String,
        required: true
    },
    startAuctionDate: {
        type: Number,
        required: true
    },
    expiredAuctionDate: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('auctionProducts', auctionProductSchema);