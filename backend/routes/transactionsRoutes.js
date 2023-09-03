const express = require('express');
const router = express.Router();
const {getAllTransactions, createTransaction,deleteTransaction, getTransactionsByID} = require('../controllers/transactionController');

router.route('/').get(getAllTransactions);
router.route('/create').post(createTransaction);
router.route('/delete/:id').delete(deleteTransaction);
router.route('/:id').get(getTransactionsByID);

module.exports = router;