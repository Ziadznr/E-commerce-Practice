const EmailSend = require("../utility/EmailHelper")
const UserModel = require("../models/UserModel")
const ProfileModel = require("../models/ProfileModel")
const { EncodeToken } = require("../utility/TokenHelper")
const UserOTPService = async(req) => {
    try {
        let email = req.params.email
        let code = Math.floor(100000 + Math.random() * 900000)
        let EmailText = `Your Verification Code is= ${code}`
        let EmailSubject = "Email Verification"

        await EmailSend(email, EmailText, EmailSubject)
        await UserModel.updateOne({ email: email }, { $set: { otp: code } }, { upsert: true })

        return { status: 'success', message: "6 digit OTP has been send" }

    } catch (error) {
        return { status: 'fail', message: "Something Went Wrong" }
    }
}

const VerifyOTPService = async(req) => {
    try {
        let email = req.params.email;
        let otp = req.params.otp;

        // User Count
        let total = await UserModel.find({ email: email, otp: otp }).count("total")

        if (total == 1) {

            // User ID Read
            let user_id = await UserModel.find({ email: email, otp: otp }).count("_id");

            // User token create
            let token = await EncodeToken(email, user_id[0]['_id'].toString())

            // OTP code update to zero
            await UserModel.updateOne({ email: email }, { $set: { otp: '0' } })
            return { status: 'success', message: "Valid OTP", token: token }
        } else {
            return { status: 'fail', message: "Invalid OTP" }
        }
    } catch (error) {
        return { status: 'fail', message: "Something Went Wrong" }
    }
}

// Logout can possible only controller use

const SaveProfileService = async(req) => {
    try {
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        reqBody.userId = user_id;

        await ProfileModel.updateOne({ userId: user_id }, { $set: reqBody }, { upsert: true })

        return { status: 'success', message: "Profile Save Success" }
    } catch (error) {
        return { status: 'fail', message: "Something Went Wrong" }
    }
}

const ReadProfileService = async(req) => {
    try {
        let user_id = req.headers.user_id;
        await ProfileModel.find({ userId: user_id })
        return { status: 'success', message: "Profile Save Success" }
    } catch (error) {
        return { status: 'fail', message: "Something Went Wrong" }
    }

}

module.exports = {
    UserOTPService,
    VerifyOTPService,
    LogoutService,
    SaveProfileService,
    ReadProfileService
}