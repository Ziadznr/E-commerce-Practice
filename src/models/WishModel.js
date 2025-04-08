const mongoose = require("mongoose")

const DataSchema = mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true }


}, { timestamps: true, versionKey: false })

const WishModel = mongoose.model('wishes', DataSchema)

module.exports = WishModel