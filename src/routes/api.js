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
router.get("/ProductListByBrand/:brandId", ProductController.ProductListByBrand)
router.get("/ProductListByCategory/:categoryId", ProductController.ProductListByCategory)
router.get("/ProductListBySimilar/:categoryId", ProductController.ProductListBySimilar)
router.get("/ProductListByKeyword/:keyword", ProductController.ProductListByKeyword)
router.get("/ProductListByRemark/:remark", ProductController.ProductListByRemark)
router.get("/ProductDetails/:productId", ProductController.ProductDetails)
router.get("/ProductReviewList/:productId", ProductController.ProductReviewList)
router.post("/ProductListByFilter", ProductController.ProductListByFilter)

// User 
router.get("/UserOTP/:email", UserController.UserOTP)
router.get("/VerifyOTP/:email/:otp", UserController.VerifyOTP)
router.get("/UserLogout", UserController.UserLogout);



router.post("/CreateProfile", AuthVerification, UserController.CreateProfile)
router.post("/UpdateProfile", AuthVerification, UserController.UpdateProfile)
router.get("/ReadProfile", AuthVerification, UserController.ReadProfile)

// WishList
router.post("/SaveWishList", AuthVerification, WishListController.SaveWishList)
router.post("/RemoveWishList", AuthVerification, WishListController.RemoveWishList)
router.get("/WishList", AuthVerification, WishListController.WishList)

// Cart
router.get("/CartList", AuthVerification, CartListController.CartList)
router.post("/SaveCartList", AuthVerification, CartListController.SaveCartList)
router.post("/RemoveCartList", AuthVerification, CartListController.RemoveCartList)
router.post("/UpdateCartList/:cartId", AuthVerification, CartListController.UpdateCartList)


router.get("/CreateInvoice", AuthVerification, InvoiceController.CreateInvoice)
    // Invoice &Payment


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