const express = require('express');
const router = express.Router();
const {getAllTransactions, createTransaction,deleteTransaction, getTransactionsByID, updateTransactionsByID} = require('../controllers/transactionController');

router.route('/').get(getAllTransactions);
router.route('/:id').get(getTransactionsByID);
router.route('/create').post(createTransaction);
router.route('/delete/:id').delete(deleteTransaction);
router.route('/update/:id').put(updateTransactionsByID);

module.exports = router;