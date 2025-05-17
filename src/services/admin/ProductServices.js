const mongoose = require("mongoose");
const ObjectID = mongoose.Types.ObjectId;
const ProductModel = require("../../models/ProductModel");
const ProductDetailModel = require("../../models/ProductDetailModel");
const BrandModel = require("../../models/BrandModel");
const CategoryModel = require("../../models/CategoryModel");

// CREATE Product
const CreateProductService = async(req) => {
    try {
        const productData = req.body;

        // Auto-create brand if not exists
        const brandExists = await BrandModel.findById(productData.brandId);
        if (!brandExists) {
            await new BrandModel({ _id: productData.brandId, name: "Unnamed Brand" }).save();
        }

        // Auto-create category if not exists
        const categoryExists = await CategoryModel.findById(productData.categoryId);
        if (!categoryExists) {
            await new CategoryModel({ _id: productData.categoryId, name: "Unnamed Category" }).save();
        }

        const product = await ProductModel.create(productData);

        if (product && product._id) {
            const detailsData = req.body.details;
            detailsData.productId = product._id;
            await ProductDetailModel.create(detailsData);
        }

        return { status: "success", message: "Product created successfully" };
    } catch (error) {
        console.error("CreateProductService error:", error);
        return { status: "fail", message: "Product creation failed", error: error.message };
    }
};

// UPDATE Product
const UpdateProductService = async(req) => {
    try {
        const productId = req.params.id;
        const productData = req.body;

        await ProductModel.updateOne({ _id: productId }, { $set: productData });

        const detailsData = req.body.details;
        await ProductDetailModel.updateOne({ productId: productId }, { $set: detailsData }, { upsert: true });

        return { status: "success", message: "Product updated successfully" };
    } catch (error) {
        console.error("UpdateProductService error:", error);
        return { status: "fail", message: "Product update failed", error: error.message };
    }
};

// DELETE Product
const DeleteProductService = async(req) => {
    try {
        const productId = req.params.id;

        await ProductModel.deleteOne({ _id: productId });
        await ProductDetailModel.deleteOne({ productId: productId });

        return { status: "success", message: "Product deleted successfully" };
    } catch (error) {
        console.error("DeleteProductService error:", error);
        return { status: "fail", message: "Product deletion failed", error: error.message };
    }
};

// LIST Products
const ListProductService = async() => {
    try {
        const data = await ProductModel.aggregate([{
                $lookup: {
                    from: "brands",
                    localField: "brandId",
                    foreignField: "_id",
                    as: "brand"
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "category"
                }
            },
            { $unwind: "$brand" },
            { $unwind: "$category" },
            {
                $project: {
                    title: 1,
                    price: 1,
                    discount: 1,
                    discountPrice: 1,
                    stock: 1,
                    remark: 1,
                    "brand.name": 1,
                    "category.name": 1
                }
            }
        ]);

        return { status: "success", data };
    } catch (error) {
        console.error("ListProductService error:", error);
        return { status: "fail", message: "Product listing failed", error: error.message };
    }
};

// DETAILS Product
const DetailsService = async(req) => {
    try {
        const { productId } = req.params;

        if (!ObjectID.isValid(productId)) {
            return { status: "fail", message: "Invalid product ID format" };
        }

        const _id = new ObjectID(productId);

        const data = await ProductModel.aggregate([
            { $match: { _id } },
            {
                $lookup: {
                    from: "brands",
                    localField: "brandId",
                    foreignField: "_id",
                    as: "brand"
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $lookup: {
                    from: "productdetails",
                    localField: "_id",
                    foreignField: "productId",
                    as: "details"
                }
            },
            { $unwind: "$brand" },
            { $unwind: "$category" },
            { $unwind: "$details" },
            {
                $project: {
                    'brand._id': 0,
                    'category._id': 0
                }
            }
        ]);

        return { status: "success", data };
    } catch (error) {
        console.error("DetailsService error:", error);
        return { status: "fail", message: "Something went wrong", error: error.message };
    }
};

module.exports = {
    CreateProductService,
    UpdateProductService,
    DeleteProductService,
    ListProductService,
    DetailsService
};