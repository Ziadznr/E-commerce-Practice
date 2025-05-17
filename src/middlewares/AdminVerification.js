const AdminModel = require("../models/AdminModel");
const { DecodeToken } = require("../utility/TokenHelper");

const AdminVerification = async(req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const tokenFromHeader = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
        const token = tokenFromHeader || req.cookies['token'];

        if (!token) {
            return res.status(401).json({ status: 'fail', message: "Token not provided" });
        }

        const decoded = DecodeToken(token);
        if (!decoded) {
            return res.status(401).json({ status: 'fail', message: "Unauthorized" });
        }

        const admin = await AdminModel.findById(decoded.user_id);
        if (!admin) {
            return res.status(403).json({ status: 'fail', message: "Forbidden: Admins only" });
        }

        req.headers.admin_id = decoded.user_id;
        req.headers.email = decoded.email;
        next();
    } catch (error) {
        return res.status(500).json({ status: 'fail', message: "Server error", error: error.message });
    }
};

module.exports = AdminVerification;