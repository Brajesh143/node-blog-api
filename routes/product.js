const express = require("express")
const router = express.Router()
const ProductController = require("../controller/product")

router.get('/', ProductController.getProducts)

router.post('/', ProductController.createProduct)

router.get('/:id', ProductController.getSingleProduct)

router.put('/:id', ProductController.updateProduct)

router.delete('/:id', ProductController.deleteProduct)

module.exports = router;