const express = require('express');
const router = express.Router();
const tokenValidator = require('../middleware/tokenValidator');
const OrderController = require('../controller/order');

router.post('/', tokenValidator, OrderController.createOrder);

router.get('/', tokenValidator, OrderController.getOrders);

router.get('/:id', tokenValidator, OrderController.getOrderDetails);

router.delete('/:id', tokenValidator, OrderController.deleteOrder);

router.post('/update-status', tokenValidator, OrderController.orderStatusUpdate);

module.exports = router;
