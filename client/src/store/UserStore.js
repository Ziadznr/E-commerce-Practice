import { create } from 'zustand';
import axios from 'axios';
import { getEmail, setEmail } from '../utility/utility';
import Cookies from "js-cookie"


const UserStore = create((set) => ({


    isLogin: () => {
        !!Cookies.get('token')

    },

    LoginFormData: { email: "" },

    LoginFormOnChange: (name, value) => {
        set((state) => ({

            LoginFormData: {
                ...state.LoginFormData,
                [name]: value
            }
        }))
    },

    OTPFormData: { otp: "" },

    OTPFormOnChange: (name, value) => {
        set((state) => ({

            OTPFormData: {
                ...state.OTPFormData,
                [name]: value
            }
        }))
    },
    isFormSubmit: false,
    UserOTPRequest: async(email) => {
        set({ isFormSubmit: true })
        let res = await axios.get(`/api/v1/UserOTP/${email}`);

        setEmail(email)
        set({ isFormSubmit: false })

        return res.data['status'] === "success"
    },
    VerifyOTPRequest: async(otp) => {
        set({ isFormSubmit: true })
        let email = getEmail()
        let res = await axios.get(`/api/v1/VerifyOTP/${email}/${otp}`);
        set({ isFormSubmit: false })
        return res.data['status'] === "success"
    }
}))

export default UserStore;