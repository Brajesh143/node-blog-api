const asyncHandler = require('express-async-handlr');
const Cart = require('../model/cart');
const Product = require('../model/product');
const logger = require('../utils/logger');

const createCart = asyncHandler(async (req, res, next) => {
    const { items } = req.body;
    const user_id = req.userId;

    try {
        const result = await Cart.updateOne(
            {
                user_id: user_id,
                'items.product_id': items.product_id
            },
            {
                $set: {
                    'items.$[elem].quantity': items.quantity
                }
            },
            {
                arrayFilters: [{ 'elem.product_id': items.product_id }]
            }
        );

        if (result.matchedCount === 0) {
            const addProductResult = await Cart.updateOne(
                { user_id: user_id },
                {
                    $push: {
                        items: items
                    }
                },
                { upsert: true }
            );

            if (addProductResult.modifiedCount > 0 || addProductResult.upsertedCount > 0) {
                logger.info('Cart created successfuly');
                return res.status(201).json({ message: 'Cart created successfuly' });
            } else {
                logger.info('Cart not found for user');
                return res.status(404).json({ message: 'Cart not found for user' });
            }
        } else {
            logger.info('Cart updated successfuly');
            return res.status(201).json({ message: 'Cart updated successfuly' });
        }
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

const removeCartItem = asyncHandler(async (req, res, next) => {
    const user_id = req.userId;
    const { product_id } = req.body;

    try {
        const result = await Cart.updateOne(
            {
                user_id: user_id,
                'items.product_id': product_id
            },
            {
                $pull: {
                    items: { product_id: product_id }
                }
            }
        );
    
        if (result.modifiedCount > 0) {
            return res.status(200).json({ message: 'Product removed from cart' });
        } else {
            return res.status(404).json({ message: 'Product not found in cart' });
        }
    } catch (err) {
        return next(err);
    }
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

module.exports = { createCart, getCart, updateCart, deleteCart, removeCartItem };


