const FeaturesModel = require("../models/FeaturesModel")
const LegalModel = require("../models/LegalModel")

const FeaturesListService = async() => {

    try {
        let data = await FeaturesModel.find()
        return { status: "success", data: data }
    } catch (error) {
        return { status: "fail", data: error }.toString()
    }
}

const LegalDetailsService = async() => {

    try {
        let type = req.params.type;
        let data = await LegalModel.find({ type: type })
        return { status: "success", data: data }
    } catch (error) {
        return { status: "fail", data: error }.toString()
    }
}

module.exports = {
    FeaturesListService,
    LegalDetailsService
}