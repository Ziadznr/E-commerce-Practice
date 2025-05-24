import { create } from 'zustand';
import axios from 'axios';
import { getEmail, setEmail } from '../utility/utility';
import Cookies from "js-cookie"
import ProfileForm from '../components/user/profile-form';
import { unauthorized } from '../utility/utility';

const UserStore = create((set, get) => ({
    loginStatus: !!Cookies.get("token"),

    setLoginStatus: (status) => set({ loginStatus: status }),

    isLogin: () => get().loginStatus,



    LoginFormData: { email: "" },

    LoginFormOnChange: (name, value) => {
        set((state) => ({

            LoginFormData: {
                ...state.LoginFormData,
                [name]: value
            }
        }))
    },
    UserLogoutRequest: async() => {
        set({ isFormSubmit: true });
        const res = await axios.get('/api/v1/UserLogout', {
            withCredentials: true,
        });

        set({ isFormSubmit: false });

        if (res.data['status'] === "success") {
            Cookies.remove("token"); // 👈 Remove token from cookies
            set({ loginStatus: false }); // 👈 Set loginStatus false
            return true;
        }

        return false;
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
        if (res.data['status'] === "success") {
            Cookies.set("token", res.data["token"]);
            set({ loginStatus: true }); // 👈 update Zustand
            return true;
        }
        return false;
    },

    ProfileForm: { cus_add: "", cus_city: "", cus_country: "", cus_fax: "", cus_name: "", cus_phone: "", cus_postcode: "", cus_state: "", ship_add: "", ship_city: "", ship_country: "", ship_name: "", ship_phone: "", ship_postcode: "", ship_state: "" },
    ProfileFormChange: (name, value) => {
        set((state) => ({
            ProfileForm: {
                ...state.ProfileForm,
                [name]: value
            }
        }))
    },
    ProfileDetails: null,
    ProfileDetailsRequest: async() => {
        try {
            const token = Cookies.get('token'); // If you're using cookies for storing the token
            let res = await axios.get('/api/v1/ReadProfile', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                withCredentials: true // Ensure that cookies are sent with the request if needed
            });


            if (res.data['data'].length > 0) {
                set({ ProfileDetails: res.data['data'][0] })
                set({ ProfileForm: res.data['data'][0] })
            } else {
                set({ ProfileDetails: [] })
            }
        } catch (error) {
            unauthorized(error.response.status)
        }
    },
    ProfileSaveRequest: async(PostBody) => {
        try {
            set({ ProfileDetails: null })
            let res = await axios.post('/api/v1/UpdateProfile', PostBody, {
                withCredentials: true, // For cookies
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}` // If token is in cookies
                }
            });
            return res.data['status'] === "success"
        } catch (error) {
            unauthorized(error.response.status)
        }
    }


}))

export default UserStore;