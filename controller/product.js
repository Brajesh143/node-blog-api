const asyncHandlr = require("express-async-handlr")
const Product = require("../model/product");
const logger = require("../utils/logger");

const getProducts = asyncHandlr(async(req, res, next) => {
    try {
        const products = await Product.find();

        return res.status(200).json({ message: "Product List", data: products })
    } catch (err) {
        return next(err)
    }
})

const createProduct = asyncHandlr(async(req, res, next) => {
    const { name, description, price } = req.body;
    const image = req.file;

    try {
        const create_product = await Product.create({
            name,
            description,
            price
        })

        if (req.file) {
            const imageUrl = `/public/uploads/products/${image.filename}`;
            const productImage = await Product.updateOne({_id: create_product.id}, {$set:{product_image: imageUrl}})
        }

        logger.info('Product created successfully', create_product)
        return res.status(201).json({ message: "Product has been created successfuly", data: create_product })
    } catch (err) {
        return next(err)
    }
})

const getSingleProduct = asyncHandlr(async(req, res, next) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id)

        return res.status(200).json({ message: "Product details", data: product })
    } catch (err) {
        return next(err)
    }
})

const updateProduct = asyncHandlr(async(req, res, next) => {
    const { id } = req.params
    const { name, description, price } = req.body
    const image = req.file;

    try {
        const product = await Product.findByIdAndUpdate(id, 
            {
                name, description, price
            },
            {
                new: true,
                upsert: true
            }
        )

        if (req.file) {
            const imageUrl = `/public/uploads/products/${image.filename}`;
            const productImage = await Product.updateOne({_id: id}, {$set:{product_image: imageUrl}})
        }

        res.status(200).json({ message: "Product updated successfuly!", data: product })
    } catch (err) {
        return next(err)
    }
})

const deleteProduct = asyncHandlr(async(req, res, next) => {
    const { id } = req.params;

    try {
        const product = await Product.findByIdAndDelete(id);
        if (product === null) {
            return res.status(404).json({ message: "Product not found" })
        }

        return res.status(200).json({ message: "Product deleted successfuly!" })
    } catch (err) {
        return next(err)
    }
})

module.exports = { getProducts, createProduct, getSingleProduct, updateProduct, deleteProduct }
