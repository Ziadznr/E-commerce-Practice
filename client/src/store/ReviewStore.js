import axios from 'axios';
import React from 'react';
import { create } from 'zustand';
import Cookies from "js-cookie"
import { unauthorized } from '../utility/utility';

const ReviewStore = create((set) => ({

    isReviewSubmit: false,
    ReviewFormData: { des: "", rating: "5", productId: "" },
    ReviewFormOnChange: (name, value) => {
        set((state) => ({
            ReviewFormData: {
                ...state.ReviewFormData,
                [name]: value
            }
        }))
    },
    ReviewSaveRequest: async(PostBody) => {
        try {
            set({ isReviewSubmit: true })
            let res = await axios.post('/api/v1/CreateReview', PostBody, {
                withCredentials: true, // For cookies
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}` // If token is in cookies
                }

            });
            return res.data['status'] === "success"
        } catch (error) {
            unauthorized(error.response.status)
        } finally {
            set({ isReviewSubmit: false })
        }

    }
}))


export default ReviewStore;