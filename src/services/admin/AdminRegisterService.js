const bcrypt = require("bcrypt");
const AdminModel = require("../../models/AdminModel");

const AdminRegisterService = async(req) => {
    try {
        const { email, password } = req.body;

        const existingAdmin = await AdminModel.findOne();
        if (existingAdmin) {
            return { status: "fail", message: "Admin already exists" };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await AdminModel.create({ email, password: hashedPassword });

        return { status: "success", message: "Admin created successfully" };
    } catch (error) {
        return { status: "fail", message: "Error creating admin", error: error.message };
    }
};

module.exports = AdminRegisterService;