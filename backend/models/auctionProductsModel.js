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
        type: String,
        required: true
    },
    end_auction_date: {
        type: String,
        required: true
    },
    auctionStatus: {
        type: String,
        default: "waiting approved"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    productItem:
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
        subType: {
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
            type: [String],
            required: true
        },
    }
    ,
    user_seller:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
    ,
    userBidder: {
        type: [{
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
                required: true
            },
            bidAmount: {
                type: Number,
                required: true
            }
        }],
        default: []
    }
    ,
    userWinner: {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: false
        },
        bidAmount: {
            type: Number,
            required: false
        },
        default: {}
    },

});

module.exports = mongoose.model('auctionProducts', auctionProductSchema);