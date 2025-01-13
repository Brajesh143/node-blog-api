const asyncHandler = require('express-async-handlr');
const Cart = require('../model/cart');
const Product = require('../model/product');
const logger = require('../utils/logger');

const createCart = asyncHandler(async (req, res, next) => {
    const { items } = req.body;
    const user_id = req.userId;

    try {
        const cart = await Cart.create({
            user_id,
            items
        });

        logger.info('Cart created');
        return res.status(201).json({ message: 'Item added into cart successfuly', data: cart });
    } catch (err) {
        return next(err);
    }
})

const getCart = asyncHandler(async (req, res, next) => {
    const user_id = req.userId;
    try {
        const cart = await Cart.find({ user_id: user_id });

        logger.info('cart datas');
        return res.status(200).json({ message: 'Cart items list', data: cart })
    } catch (err) {
        return next(err);
    }
})

const updateCart = asyncHandler(async (req, res, next) => {
    // update cart
})

const deleteCart = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const user_id = req.userId;

    try {
        const cartDetails = await Cart.findOne({ _id: id, user_id: user_id });
        if (!cartDetails) {
            return res.status(404).json({ message: 'Cart details not found' });
        }
        await Cart.deleteOne({ _id: id, user_id: user_id });
        logger.info('Cart deleted successfuly');
        return res.status(200).json({ message: 'Cart deleted successfuly' });
    } catch (err) {
        return next(err);
    }

})

module.exports = { createCart, getCart, updateCart, deleteCart };


