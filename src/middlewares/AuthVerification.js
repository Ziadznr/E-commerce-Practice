const { DecodeToken } = require("../utility/TokenHelper");

module.exports = (req, res, next) => {
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

    req.headers.email = decoded.email;
    req.headers.user_id = decoded.user_id;

    next();
};