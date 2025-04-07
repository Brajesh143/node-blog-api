const express = require('express');
const router = express.Router();
const cartController = require('../controller/cart');
const tokenValidator = require('../middleware/tokenValidator');

router.post('/', tokenValidator, cartController.createCart);

router.get('/', tokenValidator, cartController.getCart);

router.put('/:id/:type', tokenValidator, cartController.updateCart);

router.post('/remove-item', tokenValidator, cartController.removeCartItem);

router.delete('/:id', tokenValidator, cartController.deleteCart);

router.get('/master-endpoint', tokenValidator, cartController.masterEndPoint);

module.exports = router;
