const BrandModel = require("../models/BrandModel")
const CategoryModel = require("../models/CategoryModel")
const ProductSliderModel = require("../models/ProductSliderModel")
const ProductModel = require("../models/ProductModel")
const ProductDetailModel = require("../models/ProductDetailModel")
const ReviewModel = require("../models/ReviewModel")
const mongoose = require("mongoose")

const ObjectID = mongoose.Types.ObjectId;


const BrandListService = async() => {

    try {
        let data = await BrandModel.find()
        return { status: "success", data: data }
    } catch (error) {
        return { status: "fail", data: error }.toString()
    }
}
const CategoryListService = async() => {
    try {
        let data = await CategoryModel.find()
        return { status: "success", data: data }
    } catch (error) {
        return { status: "fail", data: error }.toString()
    }
}
const SliderListService = async() => {
    try {
        let data = await ProductSliderModel.find()
        return { status: "success", data: data }
    } catch (error) {
        return { status: "fail", data: error }.toString()
    }
}



const ListByBrandService = async(req) => {

    try {
        let BrandID = new ObjectID(req.params.BrandID)
        let MatchStage = { $match: { brandId: BrandID } };
        let JoinWithBrandStage = { $lookup: { from: "brands", localField: "brandId", foreignField: "_id", as: "brand" } };
        let JoinWithCategoryStage = { $lookup: { from: "categories", localField: "categoryId", foreignField: "_id", as: "category" } };
        let UnwindBrandStage = { $unwind: "$brand" }
        let UnwindCategoryStage = { $unwind: "$category" }

        let ProjectionStage = { $project: { 'brand._id': 0, 'category._id': 0, 'categoryID': 0, 'brandID': 0 } }

        let data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectionStage
        ])
        return { status: "success", data: data }
    } catch (error) {
        return { status: "fail", data: error }.toString()
    }
}
const ListByCategoryService = async(req) => {
    try {
        let CategoryID = new ObjectID(req.params.CategoryID)
        let MatchStage = { $match: { categoryId: CategoryID } };
        let JoinWithBrandStage = { $lookup: { from: "brands", localField: "brandId", foreignField: "_id", as: "brand" } };
        let JoinWithCategoryStage = { $lookup: { from: "categories", localField: "categoryId", foreignField: "_id", as: "category" } };
        let UnwindBrandStage = { $unwind: "$brand" }
        let UnwindCategoryStage = { $unwind: "$category" }

        let ProjectionStage = { $project: { 'brand._id': 0, 'category._id': 0, 'categoryID': 0, 'brandID': 0 } }

        let data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectionStage
        ])
        return { status: "success", data: data }
    } catch (error) {
        return { status: "fail", data: error }.toString()
    }
}
const ListByRemarkService = async(req) => {
    try {
        let Remark = req.params.Remark
        let MatchStage = { $match: { remark: Remark } };
        let JoinWithBrandStage = { $lookup: { from: "brands", localField: "brandId", foreignField: "_id", as: "brand" } };
        let JoinWithCategoryStage = { $lookup: { from: "categories", localField: "categoryId", foreignField: "_id", as: "category" } };
        let UnwindBrandStage = { $unwind: "$brand" }
        let UnwindCategoryStage = { $unwind: "$category" }

        let ProjectionStage = { $project: { 'brand._id': 0, 'category._id': 0, 'categoryID': 0, 'brandID': 0 } }

        let data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectionStage
        ])
        return { status: "success", data: data }
    } catch (error) {
        return { status: "fail", data: error }.toString()
    }
}



const ListBySimilarService = async(req) => {
    try {
        let CategoryID = new ObjectID(req.params.ObjectId)
        let MatchStage = { $match: { categoryId: CategoryID } };
        let limitStage = { $limit: 20 }
        let JoinWithBrandStage = { $lookup: { from: "brands", localField: "brandId", foreignField: "_id", as: "brand" } };
        let JoinWithCategoryStage = { $lookup: { from: "categories", localField: "categoryId", foreignField: "_id", as: "category" } };
        let UnwindBrandStage = { $unwind: "$brand" }
        let UnwindCategoryStage = { $unwind: "$category" }

        let ProjectionStage = { $project: { 'brand._id': 0, 'category._id': 0, 'categoryID': 0, 'brandID': 0 } }

        let data = await ProductModel.aggregate([
            MatchStage,
            limitStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectionStage
        ])
        return { status: "success", data: data }
    } catch (error) {
        return { status: "fail", data: error }.toString()
    }
}
const ListByKeywordService = async(req) => {
    try {
        let SearchRegex = { "$regex": req.params.Keyword, "$options": "i" }
        let SearchParams = [{ title: SearchRegex }, { shortDes: SearchRegex }]
        let SearchStage = { $or: SearchParams }

        let MatchStage = { $match: SearchStage }

        let JoinWithBrandStage = { $lookup: { from: "brands", localField: "brandId", foreignField: "_id", as: "brand" } };
        let JoinWithCategoryStage = { $lookup: { from: "categories", localField: "categoryId", foreignField: "_id", as: "category" } };
        let UnwindBrandStage = { $unwind: "$brand" }
        let UnwindCategoryStage = { $unwind: "$category" }

        let ProjectionStage = { $project: { 'brand._id': 0, 'category._id': 0, 'categoryID': 0, 'brandID': 0 } }

        let data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectionStage
        ])
        return { status: "success", data: data }
    } catch (error) {
        return { status: "fail", data: error }.toString()
    }
}

const DetailsService = async(req) => {
    try {
        let ProductID = new ObjectID(req.params.ProductID)
        let MatchStage = { $match: { _id: ProductID } };

        let JoinWithBrandStage = { $lookup: { from: "brands", localField: "brandId", foreignField: "_id", as: "brand" } };
        let JoinWithCategoryStage = { $lookup: { from: "categories", localField: "categoryId", foreignField: "_id", as: "category" } };
        let JoinWithDetailsStage = { $lookup: { from: "productdetails", localField: "_id", foreignField: "productID", as: "details" } };
        let UnwindBrandStage = { $unwind: "$brand" }
        let UnwindCategoryStage = { $unwind: "$category" }
        let UnwindDetailsStage = { $unwind: "$details" }

        let ProjectionStage = { $project: { 'brand._id': 0, 'category._id': 0 } }

        let data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            JoinWithDetailsStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            UnwindDetailsStage,
            ProjectionStage
        ])
        return { status: "success", data: data }
    } catch (error) {
        return { status: "fail", data: error }.toString()
    }
}
const ReviewListService = async(req, res) => {

    try {

        let ProductID = new ObjectID(req.params.ProductID)
        let MatchStage = { $match: { productID: ProductID } }
        let JoinWithProfileStage = { $lookup: { from: "profiles", localField: "userId", foreignField: "userId", as: "profile" } };
        let UnwindProfileStage = { $unwind: "$profile" }
        let ProjectStage = { $project: { 'des': 1, 'rating': 1, 'profile.cus_name': 1 } }
        let data = await ReviewModel.aggregate([
            MatchStage,
            JoinWithProfileStage,
            UnwindProfileStage,
            ProjectStage
        ])
        return { status: "success", data: data }
    } catch (error) {
        return { status: "fail", data: error }.toString()
    }
}

const CreateReviewService = async(req) => {
    try {

        let user_id = req.headers.user_id;
        let reqBody = req.body;


        let data = await ReviewModel.create({
            productId: reqBody[`productId`],
            userId: user_id,
            des: reqBody[`des`],
            rating: reqBody[`rating`]

        })
        return { status: "success", data: data }
    } catch (error) {
        return { status: "fail", data: error }.toString()
    }
}

const ListByFilterService = async(req) => {

    try {

        let matchConditions = {};

        if (req.body['categoryId']) {
            matchConditions.categoryId = new ObjectID(req.body['categoryId'])
        }

        if (req.body['brandId']) {
            matchConditions.brandId = new ObjectID(req.body['brandId'])
        }

        let MatchStage = {
            $match: matchConditions
        }

        let AddFieldsStage = {
            $addFields: { numericPrice: { $toInt: "$price" } }
        }

        let priceMin = parseInt(req.body['priceMin']);
        let priceMax = parseInt(req.body['priceMax']);
        let PriceMatchConditions = {}

        if (!isNaN(priceMin)) {
            PriceMatchConditions['numericPrice'] = { $gte: priceMin }
        }

        if (!isNaN(priceMax)) {
            PriceMatchConditions['numericPrice'] = {...(PriceMatchConditions['numericPrice'] || {}), $lte: priceMax }
        }
        let PriceMatchStage = { $match: PriceMatchConditions }

        let JoinWithBrandStage = {
            $lookup: {
                from: 'brands',
                localField: 'brandId',
                foreignField: '_id',
                as: "brand"

            }
        };
        let JoinWithCategoryStage = {
            $lookup: {
                from: 'categories',
                localField: 'categoryId',
                foreignField: '_id',
                as: "category"

            }

        };
        let UnwindBrandStage = { $unwind: "$brand" };
        let UnwindCategoryStage = { $unwind: "$category" };
        let ProjectionStage = { $project: { 'brand._id': 0, 'category_id': 0, 'categoryId': 0, 'brandId': 0 } }

        let data = await ProductModel.aggregate([
            MatchStage,
            AddFieldsStage,
            PriceMatchStage,
            JoinWithBrandStage, JoinWithCategoryStage,
            UnwindBrandStage, UnwindCategoryStage, ProjectionStage
        ])
        return { status: "success", data: data }
    } catch (error) {
        return { status: "fail", data: error }.toString()

    }
}


module.exports = {
    BrandListService,
    CategoryListService,
    SliderListService,
    ListByBrandService,
    ListByCategoryService,
    ListBySimilarService,
    ListByKeywordService,
    ListByRemarkService,
    ListByFilterService,
    DetailsService,
    ReviewListService,
    CreateReviewService
}