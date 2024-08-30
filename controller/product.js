const asyncHandlr = require("express-async-handlr")
const Product = require("../model/product")

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
    try {
        const create_product = await Product.create({
            name,
            description,
            price
        })

        return res.status(201).json({ message: "Product has been created successfuly", data: create_product })
    } catch (err) {
        return next(err)
    }
})

module.exports = { getProducts, createProduct }
