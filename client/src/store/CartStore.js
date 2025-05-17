import { create } from "zustand";
import axios from "axios";
import { unauthorized } from "../utility/utility";
import Cookies from "js-cookie"

const CartStore = create((set) => ({

    isCartSubmit: false,
    CartForm: { productId: "", color: "", qty: "1", size: "" },
    CartFormChange: (name, value) => {
        set((state) => ({
            CartForm: {
                ...state.CartForm,
                [name]: value
            }
        }))
    },

    CartSaveRequest: async(PostBody, productId) => {
        try {
            set({ isCartSubmit: true })
            PostBody.productId = productId
            let res = await axios.post('/api/v1/SaveCartList', PostBody, {
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
                isCartSubmit: false
            })
        }
    },


    CartList: null,
    CartCount: 0,
    CartTotal: 0,
    CartVatTotal: 0,
    CartPayableTotal: 0,
    CartListRequest: async() => {
        try {

            let res = await axios.get('/api/v1/CartList', {
                withCredentials: true, // For cookies
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}` // If token is in cookies
                }
            });
            set({ CartList: res.data['data'] })
            set({ CartCount: (res.data['data']).length })
            let total = 0
            let vat = 0
            let payable = 0
            res.data['data'].forEach((item) => {
                if (item['product']['discount'] === true) {
                    total = total + parseInt(item['qty']) * parseInt(item['product']['discountPrice'])
                } else {
                    total = total + parseInt(item['qty']) * parseInt(item['product']['price'])
                }
            });

            vat = total * 0.05
            payable = vat + total
            set({ CartTotal: total })
            set({ CartVatTotal: vat })
            set({ CartPayableTotal: payable })

        } catch (error) {
            unauthorized(error.response.status)
        } finally {
            set({
                isCartSubmit: false
            })
        }
    },
    RemoveCartListRequest: async(cartId) => {
        try {
            set({ CartList: null })
            await axios.post('/api/v1/RemoveCartList', { '_id': cartId }, {
                withCredentials: true, // For cookies
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}` // If token is in cookies
                }
            });
        } catch (error) {
            unauthorized(error.response.status)
        }
    },

    CreateInvoiceRequest: async() => {
        try {
            set({ isCartSubmit: true })
            let res = await axios.get('/api/v1/CreateInvoice', {
                withCredentials: true, // For cookies
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}` // If token is in cookies
                }
            });
            window.location.href = res.data['data']['GatewayPageURL']
        } catch (error) {
            unauthorized(error.response.status)
        }
    },

    InvoiceList: null,
    InvoiceListRequest: async() => {
        try {
            let res = await axios.get('/api/v1/InvoiceList', {
                withCredentials: true, // For cookies
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}` // If token is in cookies
                }

            });
            set({ InvoiceList: res.data['data'] })
        } catch (error) {
            unauthorized(error.response.status)
        }
    },

    InvoiceDetails: null,
    InvoiceDetailsRequest: async() => {
        try {
            let res = await axios.get(`/api/v1/InvoiceProductList`, {
                withCredentials: true, // For cookies
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}` // If token is in cookies
                }

            });
            set({ InvoiceList: res.data['data'] })
        } catch (error) {
            unauthorized(error.response.status)
        }
    }



}))

export default CartStore;