const AdminRegisterService = require("../services/admin/AdminRegisterService");
const AdminLoginService = require("../services/admin/AdminLoginService");

const {
    CreateProductService,
    UpdateProductService,
    DeleteProductService
} = require("../services/admin/ProductServices");

// Admin Auth Controllers
exports.AdminRegister = async(req, res) => {
    const result = await AdminRegisterService(req);
    return res.status(200).json(result);
};

exports.AdminLogin = async(req, res) => {
    const result = await AdminLoginService(req);

    if (result.status === "success") {
        const cookieOption = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
            httpOnly: false
        };
        res.cookie("token", result.token, cookieOption);
    }

    return res.status(200).json(result);
};

exports.AdminLogout = async(req, res) => {
    const cookieOption = {
        expires: new Date(Date.now() - 24 * 60 * 60 * 1000),
        httpOnly: false
    };

    res.cookie("token", "", cookieOption);
    return res.status(200).json({ status: "success", message: "Admin logged out" });
};

// Admin Product Controllers
exports.CreateProduct = async(req, res) => {
    const result = await CreateProductService(req);
    return res.status(200).json(result);
};

exports.UpdateProduct = async(req, res) => {
    const result = await UpdateProductService(req);
    return res.status(200).json(result);
};

exports.DeleteProduct = async(req, res) => {
    const result = await DeleteProductService(req);
    return res.status(200).json(result);
};