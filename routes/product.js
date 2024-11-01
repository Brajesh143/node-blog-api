const express = require("express")
const router = express.Router()
const ProductController = require("../controller/product")
const { productSchema } = require("../utils/validation")
const validate = require("../middleware/validate")

router.get('/', ProductController.getProducts)

router.post('/', validate(productSchema), ProductController.createProduct)

router.get('/:id', ProductController.getSingleProduct)

router.put('/:id', validate(productSchema), ProductController.updateProduct)

router.delete('/:id', ProductController.deleteProduct)

module.exports = router;