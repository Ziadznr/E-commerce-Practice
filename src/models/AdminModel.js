const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
    email: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String, required: true },
    otp: { type: String, default: "0" }
}, { timestamps: true, versionKey: false });

const AdminModel = mongoose.model("admins", AdminSchema);
module.exports = AdminModel;