const mongoose = require('mongoose');

const transactionsSchema = new mongoose.Schema({
    transactionType: {
        type: String,
        require: true
    },
    imgPath: {
        type: String,
        require: true
    },
    userID: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('transactions',transactionsSchema);