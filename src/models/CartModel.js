const mongoose = require("mongoose")

const DataSchema = mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    color: { type: String, required: true },
    qty: { type: String, required: true },
    size: { type: String, required: true }


}, { timestamps: true, versionKey: false })

const CartModel = mongoose.model('carts', DataSchema)

module.exports = CartModel