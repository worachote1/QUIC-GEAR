const asyncHandler = require('express-async-handler');
const product = require('../models/product');

const getallProduct = asyncHandler(async (req, res) => {
    const products = await product.find();
    res.status(200).json(products);
});

module.exports = {getallProduct};