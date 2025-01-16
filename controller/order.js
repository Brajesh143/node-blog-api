const asyncHandler = require('express-async-handlr')
const Order = require('../model/order')
const Cart = require('../model/cart')
const Product = require('../model/product')

const createOrder = asyncHandler(async (req, res, next) => {
    // order create
})

const getOrders = asyncHandler(async (req, res, next) => {
    // get order
})

const getOrderDetails = asyncHandler(async (req, res, next) => {
    // get order details
})

const deleteOrder = asyncHandler(async (req, res, next) => {
    // delete order
})

const orderStatusUpdate = asyncHandler(async (req, res, next) => {
    // order status update
})

module.exports = { createOrder, getOrders, getOrderDetails, deleteOrder, orderStatusUpdate };