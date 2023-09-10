const mongoose = require('mongoose');

const auctionProductSchema = new mongoose.Schema({
    startPrice: {
        type: Number,
        required: true
    },
    buyOutPrice: {
        type: Number,
        required: true
    },
    start_auction_date: {
        type: Number,
        required: true
    },
    end_auction_date: {
        type: Number,
        required: true
    },
    auctionStatus: {
        type: String,
        required: true
    },
    createAt: {
        type: String,
        required: true
    },
    productItem: [
        {
            name: {
                type: String,
                required: true
            },
            brand: {
                type: String,
                required: true
            },
            type: {
                type: String,
                required: true
            },
            isWireless: {
                type: Boolean,
                required: true,
            },
            isRGB: {
                type: Boolean,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            imgPath: {
                type: String,
                required: true
            },
            subType: {
                type: String,
                required: true
            }
        }
    ],
    user_seller: [
        {
            id: {
                type: Number,
                required: true
            },
            username: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
        }
    ],
    userBidder: {
        type: [String],
        required: true
    }
    
});

module.exports = mongoose.model('auctionProducts', auctionProductSchema);