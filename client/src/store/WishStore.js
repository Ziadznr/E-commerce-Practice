import { create } from "zustand";
import axios from "axios";
import { unauthorized } from "../utility/utility";
import Cookies from "js-cookie"

const WishStore = create((set) => ({

    isWishSubmit: false,
    WishSaveRequest: async(productId) => {
        try {
            set({ isWishSubmit: true })
            let res = await axios.post('/api/v1/SaveWishList', { 'productId': productId }, {
                withCredentials: true, // For cookies
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}` // If token is in cookies
                }
            });
            return res.data['status'] === "success"
        } catch (error) {
            unauthorized(error.response.status)
        } finally {
            set({
                isWishSubmit: false
            })
        }
    },


    WishList: null,
    WishCount: 0,
    WishListRequest: async() => {
        try {

            let res = await axios.get('/api/v1/WishList', {
                withCredentials: true, // For cookies
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}` // If token is in cookies
                }
            });
            set({ WishList: res.data['data'] })
            set({ WishCount: (res.data['data']).length })
        } catch (error) {
            unauthorized(error.response.status)
        } finally {
            set({
                isWishSubmit: false
            })
        }
    },

    RemoveWishListRequest: async(productId) => {
        try {
            set({ WishList: null })
            await axios.post('/api/v1/RemoveWishList', { 'productId': productId }, {
                withCredentials: true, // For cookies
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}` // If token is in cookies
                }
            });
        } catch (error) {
            unauthorized(error.response.status)
        }
    }
}))

export default WishStore;