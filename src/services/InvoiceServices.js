const mongoose = require("mongoose");
const CartModel = require('../models/CartModel');
const ProfileModel = require('../models/ProfileModel');
const InvoiceModel = require('../models/InvoiceModel');
const InvoiceProductModel = require('../models/InvoiceProductModel');
const PaymentSettingsModel = require('../models/PaymentSettingsModel');
const ObjectID = mongoose.Types.ObjectId;
const SSLCommerzPayment = require('sslcommerz-lts');

const CreateInvoiceService = async(req) => {
    const user_id = new ObjectID(req.headers.user_id);
    const cus_email = req.headers.email;

    // 1. Get Cart and Calculate Total
    const CartProducts = await CartModel.aggregate([
        { $match: { userId: user_id } },
        { $lookup: { from: "products", localField: "productId", foreignField: "_id", as: "product" } },
        { $unwind: "$product" }
    ]);

    let totalAmount = 0;
    CartProducts.forEach((item) => {
        const price = item.product.discount ? parseFloat(item.product.discountPrice) : parseFloat(item.product.price);
        totalAmount += parseFloat(item.qty) * price;
    });

    const vat = totalAmount * 0.05;
    const payable = totalAmount + vat;

    // 2. Get Customer & Shipping Info
    const Profile = await ProfileModel.aggregate([{ $match: { userId: user_id } }]);
    if (!Profile[0]) return { status: "fail", message: "Profile not found" };

    const tran_id = `INV-${Date.now()}`; // unique
    const val_id = 0;
    const delivery_status = 'pending';
    const payment_status = 'pending';

    // 3. Create Invoice
    const invoice = await InvoiceModel.create({
        userId: user_id,
        payable,
        cus_details: `Name:${Profile[0].cus_name}, Email:${cus_email}, Address:${Profile[0].cus_add}, Phone:${Profile[0].cus_phone}`,
        ship_details: `Name:${Profile[0].ship_name}, City:${Profile[0].ship_city}, Address:${Profile[0].ship_add}, Phone:${Profile[0].ship_phone}`,
        tran_id,
        val_id,
        delivery_status,
        payment_status,
        total: totalAmount,
        vat
    });

    // 4. Save Invoice Products
    await Promise.all(CartProducts.map(item => InvoiceProductModel.create({
        userId: user_id,
        productId: item.productId,
        invoiceId: invoice._id,
        qty: item.qty,
        color: item.color,
        size: item.size,
        price: item.product.discount ? item.product.discountPrice : item.product.price
    })));

    // 5. Clear Cart
    await CartModel.deleteMany({ userId: user_id });

    // 6. Get SSLCommerz credentials
    const settings = await PaymentSettingsModel.findOne();
    const sslcz = new SSLCommerzPayment(settings.store_id, settings.store_passwd, false); // false = sandbox

    const paymentData = {
        total_amount: payable.toFixed(2),
        currency: settings.currency,
        tran_id: tran_id,
        success_url: `${settings.success_url}/${tran_id}`,
        fail_url: `${settings.fail_url}/${tran_id}`,
        cancel_url: `${settings.cancel_url}/${tran_id}`,
        ipn_url: `${settings.ipn_url}/${tran_id}`,
        shipping_method: "Courier",
        product_name: "According Invoice",
        product_category: "Ecommerce",
        product_profile: "general",
        cus_name: Profile[0].cus_name,
        cus_email: cus_email,
        cus_add1: Profile[0].cus_add,
        cus_add2: Profile[0].cus_add,
        cus_city: Profile[0].cus_city,
        cus_state: Profile[0].cus_state,
        cus_postcode: Profile[0].cus_postcode,
        cus_country: Profile[0].cus_country,
        cus_phone: Profile[0].cus_phone,
        cus_fax: Profile[0].cus_phone,
        ship_name: Profile[0].ship_name,
        ship_add1: Profile[0].ship_add,
        ship_add2: Profile[0].ship_add,
        ship_city: Profile[0].ship_city,
        ship_state: Profile[0].ship_state,
        ship_postcode: Profile[0].ship_postcode,
        ship_country: Profile[0].ship_country
    };

    const response = await sslcz.init(paymentData);

    if (response && response.GatewayPageURL) {
        {
            return {
                status: "success",
                data: {
                    GatewayPageURL: response.GatewayPageURL
                }
            };
        }
    } else {
        return { status: "fail", message: "SSLCommerz init failed", data: response };
    }
};



const PaymentFailService = async(req) => {
    try {
        let trxID = req.params.trxID;
        await InvoiceModel.updateOne({ tran_id: trxID }, { payment_status: "fail" })


        return { status: "success" }
    } catch (error) {
        return { status: "fail", message: "Something Went Wrong" }
    }
}

const PaymentCancelService = async(req) => {
    try {

        let trxID = req.params.trxID;
        await InvoiceModel.updateOne({ tran_id: trxID }, { payment_status: "cancel" })


        return { status: "success" }
    } catch (error) {
        return { status: "fail", message: "Something Went Wrong" }
    }
}


const PaymentIPNService = async(req) => {
    try {

        let trxID = req.params.trxID;
        let status = req.body['status']
        await InvoiceModel.updateOne({ tran_id: trxID }, { payment_status: status })
        return { status: "success", data: "" }
    } catch (error) {
        return { status: "fail", message: "Something Went Wrong" }
    }
}


const PaymentSuccessService = async(req) => {
    try {

        let trxID = req.params.trxID;
        await InvoiceModel.updateOne({ tran_id: trxID }, { payment_status: "success" })


        return { status: "success" }
    } catch (error) {
        return { status: "fail", message: "Something Went Wrong" }
    }
}


const InvoiceListService = async(req) => {
    try {

        let user_id = req.headers.user_id;
        let invoice = await InvoiceModel.find({ userId: user_id })


        return { status: "success", data: invoice }
    } catch (error) {
        return { status: "fail", message: "Something Went Wrong" }
    }
}




const InvoiceProductListService = async(req) => {
    try {
        // Validate ObjectIDs
        if (!ObjectID.isValid(req.params.invoice_id) || !ObjectID.isValid(req.headers.user_id)) {
            return { status: "fail", message: "Invalid invoice or user ID" };
        }

        const user_id = new ObjectID(req.headers.user_id);
        const invoice_id = new ObjectID(req.params.invoice_id);

        const matchStage = {
            $match: {
                userId: user_id,
                invoiceId: invoice_id
            }
        };

        const JoinStageProduct = {
            $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "product"
            }
        };

        const unwindStage = {
            $unwind: "$product"
        };

        const products = await InvoiceProductModel.aggregate([
            matchStage,
            JoinStageProduct,
            unwindStage
        ]);

        if (!products.length) {
            return { status: "fail", message: "No products found for this invoice" };
        }

        return { status: "success", data: products };
    } catch (error) {
        console.error("InvoiceProductListService Error:", error);
        return { status: "fail", message: "Something went wrong", error: error.message };
    }
};


module.exports = {
    CreateInvoiceService,
    PaymentFailService,
    PaymentCancelService,
    PaymentIPNService,
    PaymentSuccessService,
    InvoiceListService,
    InvoiceProductListService
}