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

        let brandId = productData.brandId;
        let categoryId = productData.categoryId;

        // Handle Brand
        if (!brandId && productData.brandName) {
            // Check if brand exists by name
            const existingBrand = await BrandModel.findOne({ brandName: productData.brandName });
            if (existingBrand) {
                brandId = existingBrand._id;
            } else {
                // brandImg is required to create a new brand
                if (!productData.brandImg) {
                    return { status: "fail", message: "Brand image (brandImg) is required to create a new brand." };
                }
                const newBrand = new BrandModel({
                    brandName: productData.brandName,
                    brandImg: productData.brandImg,
                });
                const savedBrand = await newBrand.save();
                brandId = savedBrand._id;
            }
        } else if (brandId) {
            // Optionally, verify brand exists for the given ID
            const brandExists = await BrandModel.findById(brandId);
            if (!brandExists) {
                return { status: "fail", message: "Brand with provided ID does not exist." };
            }
        }

        // Handle Category
        if (!categoryId && productData.categoryName) {
            const existingCategory = await CategoryModel.findOne({ categoryName: productData.categoryName });
            if (existingCategory) {
                categoryId = existingCategory._id;
            } else {
                if (!productData.categoryImg) {
                    return { status: "fail", message: "Category image (categoryImg) is required to create a new category." };
                }
                const newCategory = new CategoryModel({
                    categoryName: productData.categoryName,
                    categoryImg: productData.categoryImg,
                });
                const savedCategory = await newCategory.save();
                categoryId = savedCategory._id;
            }
        } else if (categoryId) {
            const categoryExists = await CategoryModel.findById(categoryId);
            if (!categoryExists) {
                return { status: "fail", message: "Category with provided ID does not exist." };
            }
        }

        // Prepare product data with resolved brandId and categoryId
        const productPayload = {
            ...productData,
            brandId,
            categoryId,
        };

        // Remove brandName, brandImg, categoryName, categoryImg from productPayload
        delete productPayload.brandName;
        delete productPayload.brandImg;
        delete productPayload.categoryName;
        delete productPayload.categoryImg;

        // Create product
        const product = await ProductModel.create(productPayload);

        // Create product details if present
        if (product && product._id && productData.details) {
            productData.details.productId = product._id;
            await ProductDetailModel.create(productData.details);
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
                    remark: 1,
                    "brand.brandName": 1,
                    "category.categoryName": 1
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

        return { status: "success", data: data[0] || null };

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