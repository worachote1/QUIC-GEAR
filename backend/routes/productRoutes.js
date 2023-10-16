const express = require('express');
const router = express.Router();
const { getAllProduct, createProduct, deleteProduct, getSingleProduct, updateProduct } = require('../controllers/productController');

router.route('/').get(getAllProduct);
router.route('/:id').get(getSingleProduct);
router.route('/create').post(createProduct);
router.route('/delete/:id').delete(deleteProduct);
router.route('/update/:id').put(updateProduct);
   
module.exports = router; 