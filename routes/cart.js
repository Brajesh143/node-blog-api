const express = require('express');
const router = express.Router();
const cartController = require('../controller/cart');
const tokenValidator = require('../middleware/tokenValidator');

router.post('/', tokenValidator, cartController.createCart);

router.get('/', tokenValidator, cartController.getCart);

router.put('/:id', tokenValidator, cartController.updateCart);

router.delete('/:id', tokenValidator, cartController.deleteCart);

module.exports = router;
