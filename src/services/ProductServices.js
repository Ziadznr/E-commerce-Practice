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
        let brandId = new ObjectID(req.params.brandId)
        let MatchStage = { $match: { brandId: brandId } };
        let JoinWithBrandStage = { $lookup: { from: "brands", localField: "brandId", foreignField: "_id", as: "brand" } };
        let JoinWithCategoryStage = { $lookup: { from: "categories", localField: "categoryId", foreignField: "_id", as: "category" } };
        let UnwindBrandStage = { $unwind: "$brand" }
        let UnwindCategoryStage = { $unwind: "$category" }

        let ProjectionStage = { $project: { 'brand._id': 0, 'category._id': 0, 'brandId': 0, 'categoryId': 0 } }

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
        let categoryId = new ObjectID(req.params.categoryId)
        let MatchStage = { $match: { categoryId: categoryId } };
        let JoinWithBrandStage = { $lookup: { from: "brands", localField: "brandId", foreignField: "_id", as: "brand" } };
        let JoinWithCategoryStage = { $lookup: { from: "categories", localField: "categoryId", foreignField: "_id", as: "category" } };
        let UnwindBrandStage = { $unwind: "$brand" }
        let UnwindCategoryStage = { $unwind: "$category" }

        let ProjectionStage = { $project: { 'brand._id': 0, 'category._id': 0, 'categoryId': 0, 'brandId': 0 } }

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
        let remark = req.params.remark
        let MatchStage = { $match: { remark: remark } };
        let JoinWithBrandStage = { $lookup: { from: "brands", localField: "brandId", foreignField: "_id", as: "brand" } };
        let JoinWithCategoryStage = { $lookup: { from: "categories", localField: "categoryId", foreignField: "_id", as: "category" } };
        let UnwindBrandStage = { $unwind: "$brand" }
        let UnwindCategoryStage = { $unwind: "$category" }

        let ProjectionStage = { $project: { 'brand._id': 0, 'category._id': 0, 'categoryId': 0, 'brandId': 0 } }

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
        let categoryId = new ObjectID(req.params.ObjectId)
        let MatchStage = { $match: { categoryId: categoryId } };
        let limitStage = { $limit: 20 }
        let JoinWithBrandStage = { $lookup: { from: "brands", localField: "brandId", foreignField: "_id", as: "brand" } };
        let JoinWithCategoryStage = { $lookup: { from: "categories", localField: "categoryId", foreignField: "_id", as: "category" } };
        let UnwindBrandStage = { $unwind: "$brand" }
        let UnwindCategoryStage = { $unwind: "$category" }

        let ProjectionStage = { $project: { 'brand._id': 0, 'category._id': 0, 'categoryId': 0, 'brandId': 0 } }

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
        let SearchRegex = { "$regex": req.params.keyword, "$options": "i" }
        let SearchParams = [{ title: SearchRegex }, { shortDes: SearchRegex }]
        let SearchStage = { $or: SearchParams }

        let MatchStage = { $match: SearchStage }

        let JoinWithBrandStage = { $lookup: { from: "brands", localField: "brandId", foreignField: "_id", as: "brand" } };
        let JoinWithCategoryStage = { $lookup: { from: "categories", localField: "categoryId", foreignField: "_id", as: "category" } };
        let UnwindBrandStage = { $unwind: "$brand" }
        let UnwindCategoryStage = { $unwind: "$category" }

        let ProjectionStage = { $project: { 'brand._id': 0, 'category._id': 0, 'categoryId': 0, 'brandId': 0 } }

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
        const { productId } = req.params;

        // Validate ObjectId
        if (!ObjectID.isValid(productId)) {
            return { status: "fail", message: "Invalid product ID format" };
        }

        const _id = new ObjectID(productId);

        const MatchStage = { $match: { _id } };

        const JoinWithBrandStage = {
            $lookup: {
                from: "brands",
                localField: "brandId",
                foreignField: "_id",
                as: "brand"
            }
        };

        const JoinWithCategoryStage = {
            $lookup: {
                from: "categories",
                localField: "categoryId",
                foreignField: "_id",
                as: "category"
            }
        };

        const JoinWithDetailsStage = {
            $lookup: {
                from: "productdetails",
                localField: "_id",
                foreignField: "productId",
                as: "details"
            }
        };

        const UnwindBrandStage = { $unwind: "$brand" };
        const UnwindCategoryStage = { $unwind: "$category" };
        const UnwindDetailsStage = { $unwind: "$details" };

        const ProjectionStage = {
            $project: {
                'brand._id': 0,
                'category._id': 0
            }
        };

        const data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            JoinWithDetailsStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            UnwindDetailsStage,
            ProjectionStage
        ]);

        return { status: "success", data };
    } catch (error) {
        console.error("DetailsService error:", error);
        return { status: "fail", message: "Something went wrong", error: error.message };
    }
};

const ReviewListService = async(req, res) => {

    try {

        let productId = new ObjectID(req.params.productId)
        let MatchStage = { $match: { productId: productId } }
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