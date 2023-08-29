const asyncHandler = require('express-async-handler');
const transaction = require('../models/transactions');

//@desc Get all transactions data
//@route GET /api/transactions

const getAllTransactions = asyncHandler (async (req,res) => {
    const transactions = await transaction.find();
    res.status(200).json(transactions);
});

//@desc create new transaction data
//@route POST /api/transactions/create

const createTransaction = asyncHandler (async (req,res) => {
    try {
        const { transactionType, imgPath, userID, transactionStatus, amount} = req.body;

        if(!transactionType || !imgPath || !userID || !amount || !transactionStatus) {
            return res.status(400).send("All data field must be valid");
        }

        const transactions = await transaction.create({
            transactionType,
            imgPath,
            userID,
            transactionStatus,
            amount
        });

        res.status(200).json(transactions);

    } catch(err) {
        console.log(err);
    }
});

//@desc delete transaction data
//@route DELETE /api/transactions/delete/:id
const deleteTransaction = asyncHandler(async (req, res) => {
    try {
        const transactionID = req.params.id;

        const existingTransaction = await transaction.findById(transactionID);

        if (!existingTransaction) {
            return res.status(404).send(`Transaction ID not found!`);
        }

        await transaction.findByIdAndDelete(transactionID);

        res.status(200).send({
            message: `Deleted ${transactionID} from database`
        });

    } catch (err) {
        console.log(err);
        res.status(500).send(`Error deleting transaction: ${err.message}`);
    }
});

//@desc Get transaction by ID
//@route GET /api/transactions/:id
const getTransactionsByID = asyncHandler (async (req,res) => {
    try {
        const transactionID = req.params.id;

        const existingTransaction = await transaction.findById(transactionID);

        if(!existingTransaction) {
            return res.status(404).send(`Transaction ID not found!`);
        }

        res.status(200).json(existingTransaction);

    } catch(err) {
        console.log(err);
    }
});

module.exports = { 
    getAllTransactions, createTransaction ,deleteTransaction, getTransactionsByID
};