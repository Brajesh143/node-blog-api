const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        required: true
    },
    product_image: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)