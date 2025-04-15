const { FeaturesListService } = require("../services/FeaturesServices")

exports.FeatureList = async(req, res) => {
    let result = await FeaturesListService(req);
    return res.status(200).json(result)
}