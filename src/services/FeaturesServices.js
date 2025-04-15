const FeaturesModel = require("../models/FeaturesModel")

const FeaturesListService = async() => {

    try {
        let data = await FeaturesModel.find()
        return { status: "success", data: data }
    } catch (error) {
        return { status: "fail", data: error }.toString()
    }
}

module.exports = {
    FeaturesListService
}