const mongoose = require('mongoose');

const transactionsSchema = new mongoose.Schema({
    transactionType: {
        type: String,
        require: true
    }, // transactionStatus
    transactionStatus: {
        type: String,
        require: true,
        default : "waiting approved"
    },
    imgPath: {
        type: String,
        require: true
    },
    userID: {
        type: String,
        require: true
    },
    transactionStatus: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    userAccount: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user', 
            required: true
        }
    ,
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('transactions',transactionsSchema);