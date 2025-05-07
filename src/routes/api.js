const express = require("express")
const ProductController = require("../controllers/ProductController")
const UserController = require("../controllers/UserController")
const WishListController = require("../controllers/WishlistController")
const CartListController = require("../controllers/CartlistController")
const InvoiceController = require("../controllers/InvoiceController")
const FeaturesController = require("../controllers/FeaturesController")

const AuthVerification = require("../middlewares/AuthVerification")

const router = express.Router()

// Product
router.get("/ProductBrandList", ProductController.ProductBrandList)
router.get("/ProductCategoryList", ProductController.ProductCategoryList)
router.get("/ProductSliderList", ProductController.ProductSliderList)
router.get("/ProductListByBrand/:BrandID", ProductController.ProductListByBrand)
router.get("/ProductListByCategory/:CategoryID", ProductController.ProductListByCategory)
router.get("/ProductListBySimilar/:CategoryID", ProductController.ProductListBySimilar)
router.get("/ProductListByKeyword/:Keyword", ProductController.ProductListByKeyword)
router.get("/ProductListByRemark/:Remark", ProductController.ProductListByRemark)
router.get("/ProductDetails/:ProductID", ProductController.ProductDetails)
router.get("/ProductReviewList/:ProductID", ProductController.ProductReviewList)
router.post("/ProductListByFilter", ProductController.ProductListByFilter)

// User 
router.get("/UserOTP/:email", UserController.UserOTP)
router.get("/VerifyOTP/:email/:otp", UserController.VerifyOTP)
router.get("/UserLogout", AuthVerification, UserController.UserLogout)

router.post("/CreateProfile", AuthVerification, UserController.CreateProfile)
router.post("/UpdateProfile", AuthVerification, UserController.UpdateProfile)
router.get("/ReadProfile", AuthVerification, UserController.ReadProfile)

// WishList
router.post("/SaveWishList", AuthVerification, WishListController.SaveWishList)
router.post("/RemoveWishList", AuthVerification, WishListController.RemoveWishList)
router.get("/WishList", AuthVerification, WishListController.WishList)

// Cart
router.post("/SaveCartList", AuthVerification, CartListController.SaveCartList)
router.post("/RemoveCartList", AuthVerification, CartListController.RemoveCartList)
router.post("/UpdateCartList/:cartId", AuthVerification, CartListController.UpdateCartList)
router.get("/WishList", AuthVerification, WishListController.WishList)

// Invoice &Payment
router.get("/CreateInvoice", AuthVerification, InvoiceController.CreateInvoice)

router.get("/InvoiceList", AuthVerification, InvoiceController.InvoiceList)
router.get("/InvoiceProductList/:invoice_id", AuthVerification, InvoiceController.InvoiceProductList)

router.post("/PaymentSuccess/:trxID", InvoiceController.PaymentSuccess)
router.post("/PaymentCancel/:trxID", InvoiceController.PaymentCancel)
router.post("/PaymentFail/:trxID", InvoiceController.PaymentFail)
router.post("/PaymentIPN/:trxID", InvoiceController.PaymentIPN)

// Feature
router.get("/FeatureList", FeaturesController.FeatureList)
router.get("/LegalDetails/:type", FeaturesController.LegalDetails)

// Create Review
router.post("/CreateReview", AuthVerification, ProductController.CreateReview)
module.exports = router