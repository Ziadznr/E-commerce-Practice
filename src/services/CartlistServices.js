const CartModel = require("../models/CartModel")
const mongoose = require("mongoose")
const ObjectID = mongoose.Types.ObjectId

const CartListService = async(req) => {
    try {
        let user_id = new ObjectID(req.headers.user_id);
        let matchStage = { $match: { userId: user_id } }

        let joinStageProduct = { $lookup: { from: 'products', localField: 'productId', foreignField: '_id', as: 'product' } }
        let unwindProductStage = {
            $unwind: '$product'
        }

        let joinStageBrand = { $lookup: { from: 'brands', localField: 'product.brandId', foreignField: '_id', as: 'brand' } }
        let unwindBrandtStage = {
            $unwind: '$brand'
        }

        let joinStageCategory = { $lookup: { from: 'categories', localField: 'product.categoryId', foreignField: '_id', as: 'category' } }
        let unwindCategoryStage = {
            $unwind: '$category'
        }


        let projectionStage = {
            $project: {
                '_id': 0,
                'userId': 0,
                'createAt': 0,
                'updateAt': 0,
                'product._id': 0,
                'product.categoryId': 0,
                'product.brandId': 0,
                'brand._id': 0,
                'category._id': 0

            }
        }
        let data = await CartModel.aggregate([
            matchStage,
            joinStageProduct,
            unwindProductStage,
            joinStageBrand,
            unwindBrandtStage,
            joinStageCategory,
            unwindCategoryStage,
            projectionStage
        ])

        return { status: "success", data: data }
    } catch (error) {
        return { status: 'fail', message: "Something Went Wrong" }
    }
}

const SaveCartListService = async(req) => {
    try {
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        reqBody.userId = user_id;

        await CartModel.create(reqBody)


        return { status: "success", message: "Cart List Create Success" }
    } catch (error) {
        return { status: 'fail', message: "Something Went Wrong" }
    }
}

const RemoveCartListService = async(req) => {
    try {
        let user_id = req.headers.user_id;
        let reqBody = req.body
        reqBody.userId = user_id

        await CartModel.deleteOne(reqBody)

        return { status: "success", message: "Cart List Remove Success." }
    } catch (error) {
        return { status: 'fail', message: "Something Went Wrong" }
    }
}

const UpdateCartListService = async(req) => {
    try {
        let user_id = req.headers.user_id;
        let cartId = req.params.cartId;
        let reqBody = req.body;

        await CartModel.updateOne({ _id: cartId, userId: user_id }, { $set: reqBody })


        return { status: "success", message: "Cart List Update Success" }
    } catch (error) {
        return { status: 'fail', message: "Something Went Wrong" }
    }
}

module.exports = {
    CartListService,
    SaveCartListService,
    RemoveCartListService,
    UpdateCartListService
}