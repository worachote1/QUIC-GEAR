const asyncHandler = require('express-async-handler');
const transaction = require('../models/transactionsModel');

//@desc Get all transactions data
//@route GET /api/transactions

const getAllTransactions = asyncHandler (async (req,res) => {
    const transactions = await transaction.find().populate('userAccount');
    res.status(200).json(transactions);
});

//@desc create new transaction data
//@route POST /api/transactions/create

const createTransaction = asyncHandler (async (req,res) => {
    try {
<<<<<<<<< Temporary merge branch 1
        const { transactionType, imgPath, userID, transactionStatus, amount} = req.body;

        if(!transactionType || !imgPath || !userID || !amount || !transactionStatus) {
            return res.status(400).send("All data field must be valid");
=========
        const { transactionType, imgPath, amount, userAccount} = req.body;

        if(!transactionType || !imgPath || !userAccount || !amount) {
            res.status(400).send("All data field must be valid");
        }

        const transactions = await transaction.create({
            transactionType,
            imgPath,
<<<<<<<<< Temporary merge branch 1
            userID,
            transactionStatus,
            amount
=========
            amount,
            userAccount
>>>>>>>>> Temporary merge branch 2
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


// Update product => PUT api//update/:id
const updateTransactionsByID = asyncHandler(async (req, res) => {
    let transactionData = await transaction.findById(req.params.id);

    if(!transactionData) {
        return res.status(404).send('Transaction not found!');
    }

    transactionData = await transaction.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(transactionData)
});

module.exports = { 
    getAllTransactions, createTransaction ,deleteTransaction, getTransactionsByID, updateTransactionsByID
};