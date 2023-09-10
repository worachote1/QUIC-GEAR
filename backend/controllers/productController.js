const asyncHandler = require('express-async-handler');
const product = require('../models/productModel');

// Get all products => GET api/products
const getAllProduct = asyncHandler(async (req, res) => {
    const products = await product.find();
    res.status(200).json(products);
});

// Get single product => GET api/products/:id
const getSingleProduct = asyncHandler(async (req, res) => {
    try {
        const productId = req.params.id;

        const targetProduct = await product.findById(productId);

        if(!targetProduct) {
            return res.status(404).send('Product ID not found!');
        }

        res.status(200).json(targetProduct);

    } catch(err) {
        console.log(err);
    }
});

// Create new product => POST api/products/create
const createProduct = asyncHandler(async (req, res) => {
    try {
        const { name,
                price,
                type,
                brand,
                isWireless,
                isRGB,
                imgPath,
                stock,
                rating,
                description,
                totalProductOrder,
                createdAt,
                subType } = req.body;

        const products = await product.create({
            name,
            price,
            type,
            brand,
            isWireless,
            isRGB,
            imgPath,
            stock,
            rating,
            description,
            totalProductOrder,
            createdAt,
            subType
        });

        res.status(200).json(products);
    } catch(err) {
        console.log(err);
    }
});

// Delete product => DELETE api/products/delete/:id
const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const productId = req.params.id;

        const deleteProductId = await product.findById(productId);

        if(!deleteProductId) {
            return res.status(404).send('Product ID not found!');
        }

        await product.findByIdAndDelete(productId);

        res.status(200).send({
            message: `Deleted ${productId} from database`
        });
    } catch(err) {
        console.log(err);
    }
});

// Update product => PUT api/products/update/:id
const updateProduct = asyncHandler(async (req, res) => {
    let products = await product.findById(req.params.id);

    if(!products) {
        return res.status(404).send('Product not found!');
    }

    products = await product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(products)
});

module.exports = { getAllProduct, createProduct, deleteProduct, getSingleProduct, updateProduct };