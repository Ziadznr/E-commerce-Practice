const EmailSend = require("../utility/EmailHelper")
const UserModel = require("../models/UserModel")
const ProfileModel = require("../models/ProfileModel")
const { EncodeToken } = require("../utility/TokenHelper")
const UserOTPService = async(req) => {
    try {
        let email = req.params.email.toLowerCase();
        let code = (Math.floor(100000 + Math.random() * 900000)).toString();
        let EmailText = `Your Verification Code is = ${code}`;
        let EmailSubject = "Email Verification";

        await EmailSend(email, EmailText, EmailSubject);

        await UserModel.updateOne(
            { email },
            { $set: { otp: code, otpCreatedAt: new Date() } },
            { upsert: true }
        );

        return { status: 'success', message: "6 digit OTP has been sent" };

    } catch (error) {
        console.error("UserOTPService Error:", error);
        return { status: 'fail', message: "Something Went Wrong" };
    }
}

const VerifyOTPService = async(req) => {
    try {
        const email = req.params.email.toLowerCase(); // normalise case!
        const otp = req.params.otp; // keep as string

        // 1️⃣  Find the user document in one shot
        const user = await UserModel.findOne({ email, otp });

        if (!user) {
            return { status: 'fail', message: 'Invalid OTP' };
        }

        // 2️⃣  Build the JWT
        const token = await EncodeToken(user.email, user._id.toString());

        // 3️⃣  Invalidate the OTP
        await UserModel.updateOne({ _id: user._id }, { $set: { otp: '0' } });

        return { status: 'success', message: 'Valid OTP', token };
    } catch (err) {
        console.error(err);
        return { status: 'fail', message: 'Something Went Wrong' };
    }
};


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
        let result = await ProfileModel.find({ userId: user_id });

        return {
            status: 'success',
            message: 'Profile read success',
            data: result
        };
    } catch (error) {
        console.error("ReadProfileService error:", error);
        return {
            status: 'fail',
            message: 'Something went wrong'
        };
    }
};


const LogoutService = async() => {
    try {
        // No need to do much here unless you're blacklisting tokens or clearing sessions
        return { status: 'success', message: "Logout successful" }
    } catch (error) {
        return { status: 'fail', message: "Logout failed" }
    }
}

module.exports = {
    UserOTPService,
    VerifyOTPService,
    LogoutService,
    SaveProfileService,
    ReadProfileService
}