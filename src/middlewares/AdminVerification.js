const AdminModel = require("../models/AdminModel");
const { DecodeToken } = require("../utility/TokenHelper");

const AdminVerification = async(req, res, next) => {
    try {
        // Extract token from Authorization header or cookie
        const authHeader = req.headers['authorization'];
        const tokenFromHeader = authHeader && authHeader.startsWith('Bearer ') ?
            authHeader.split(' ')[1] :
            null;
        const tokenFromCookie = req.cookies ? req.cookies.token : null;
        const token = tokenFromHeader || tokenFromCookie;

        console.log('Authorization Header:', authHeader);
        console.log('Cookies:', req.cookies);
        console.log('Extracted Token:', token);

        if (!token) {
            console.warn('No token provided');
            return res.status(401).json({ status: 'fail', message: "Token not provided" });
        }

        const decoded = DecodeToken(token);
        console.log('Decoded Token:', decoded);

        if (!decoded || !decoded.user_id) {
            console.warn('Token invalid or expired');
            return res.status(401).json({ status: 'fail', message: "Unauthorized" });
        }

        const admin = await AdminModel.findById(decoded.user_id);
        console.log('Admin Found:', admin);

        if (!admin) {
            return res.status(403).json({ status: 'fail', message: "Forbidden: Admins only" });
        }

        // Attach decoded info to request object (not headers)
        req.admin = {
            id: decoded.user_id,
            email: decoded.email
        };

        next();
    } catch (error) {
        console.error('AdminVerification Error:', error);
        return res.status(500).json({
            status: 'fail',
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = AdminVerification;