require("dotenv").config(); // Make sure this is called early in your app

const {
  CreateInvoiceService,
  PaymentSuccessService,
  PaymentFailService,
  PaymentCancelService,
  PaymentIPNService,
  InvoiceListService,
  InvoiceProductListService
} = require("../services/InvoiceServices");

// Default to localhost if not defined
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

exports.CreateInvoice = async (req, res) => {
  let result = await CreateInvoiceService(req);
  return res.status(200).json(result);
};

exports.PaymentSuccess = async (req, res) => {
  await PaymentSuccessService(req);
  return res.redirect(`${FRONTEND_URL}/orders`);
};

exports.PaymentFail = async (req, res) => {
  await PaymentFailService(req);
  return res.redirect(`${FRONTEND_URL}/orders`);
};

exports.PaymentCancel = async (req, res) => {
  await PaymentCancelService(req);
  return res.redirect(`${FRONTEND_URL}/orders`);
};

exports.PaymentIPN = async (req, res) => {
  let result = await PaymentIPNService(req);
  return res.status(200).json(result);
};

exports.InvoiceList = async (req, res) => {
  let result = await InvoiceListService(req);
  return res.status(200).json(result);
};

exports.InvoiceProductList = async (req, res) => {
  let result = await InvoiceProductListService(req);
  return res.status(200).json(result);
};
