const bcrypt = require("bcrypt");
const AdminModel = require("../../models/AdminModel");
const { EncodeToken } = require("../../utility/TokenHelper");

const AdminLoginService = async(req) => {
    try {
        const { email, password } = req.body;

        const admin = await AdminModel.findOne({ email });
        if (!admin) {
            return { status: "fail", message: "Admin not found" };
        }

        const match = await bcrypt.compare(password, admin.password);
        if (!match) {
            return { status: "fail", message: "Incorrect password" };
        }

        const token = EncodeToken(admin.email, admin._id.toString());
        return { status: "success", token };
    } catch (error) {
        return { status: "fail", message: "Error during login", error: error.message };
    }
};

module.exports = AdminLoginService;