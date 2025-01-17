const asyncHandler = require('express-async-handlr')
const Order = require('../model/order')
const Cart = require('../model/cart')
const Product = require('../model/product')
const logger = require('../utils/logger')

const createOrder = asyncHandler(async (req, res, next) => {
    const user_id = req.userId;
    const carts = await Cart.findOne({ user_id: user_id });

    try {
        const orderItems = carts.items.map(item => (
            {
                'product_id': item.product_id,
                'quantity': item.quantity,
                'price': item.price,
            }
        ))

        const totalAmount = orderItems.reduce((acc, item) => acc + (item.quantity * item.price), 0);

        const orderCreate = await Order.create({
            user_id: user_id,
            items: orderItems,
            total_amount: totalAmount,
            status: 'Pending',
            created_at: new Date(),
        })

        if (orderCreate) {
            const cartDelete = await Cart.deleteOne({ user_id: user_id });
        }

        return res.status(201).json({ message: 'Order Created', data: orderCreate });
    } catch (err) {
        return next(err);
    }
})

const getOrders = asyncHandler(async (req, res, next) => {
    const user_id = req.userId;
    try {
        const orders = await Order.find({ user_id: user_id });
        logger.info('Orders list');
        return res.status(200).json({ message: 'Orders list', data: orders });
    } catch (err) {
        return next(err);
    }
})

const getOrderDetails = asyncHandler(async (req, res, next) => {
    const user_id = req.userId;
    const { id } = req.params;
    try {
        const orderDetails = await Order.findOne({ _id: id, user_id: user_id })
        logger.info('Order Details');
        return res.status(200).json({ message: 'Order details', data: orderDetails });
    } catch (err) {
        return next(err);
    }
})

const deleteOrder = asyncHandler(async (req, res, next) => {
    // delete order
})

const orderStatusUpdate = asyncHandler(async (req, res, next) => {
    // order status update
})

module.exports = { createOrder, getOrders, getOrderDetails, deleteOrder, orderStatusUpdate };