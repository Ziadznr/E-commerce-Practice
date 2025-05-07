const mongoose = require("mongoose")

const DataSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ["terms", "privacy", "about", "refund", "howtobuy", "contact", "complain"],
    }
})
const LegalModel = mongoose.model('legals', DataSchema)

module.exports = LegalModel