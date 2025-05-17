import { create } from 'zustand';
import axios from 'axios';

const ProductStore = create((set) => ({
    BrandList: null,
    BrandListRequest: async() => {
        try {
            const res = await axios.get('/api/v1/ProductBrandList');
            if (res.data.status === "success") {
                set({ BrandList: res.data.data });
            }
        } catch (e) {
            console.error("BrandListRequest Error:", e);
        }
    },

    CategoryList: null,
    CategoryListRequest: async() => {
        try {
            const res = await axios.get('/api/v1/ProductCategoryList');
            if (res.data.status === "success") {
                set({ CategoryList: res.data.data });
            }
        } catch (e) {
            console.error("CategoryListRequest Error:", e);
        }
    },

    SliderList: null,
    SliderListRequest: async() => {
        try {
            const res = await axios.get('/api/v1/ProductSliderList');
            if (res.data.status === "success") {
                set({ SliderList: res.data.data });
            }
        } catch (e) {
            console.error("SliderListRequest Error:", e);
        }
    },

    ListByRemark: null,
    ListByRemarkRequest: async(remark) => {
        try {
            set({ ListByRemark: null });
            const res = await axios.get(`/api/v1/ProductListByRemark/${remark}`);
            if (res.data.status === "success") {
                set({ ListByRemark: res.data.data });
            }
        } catch (e) {
            console.error("ListByRemarkRequest Error:", e);
        }
    },

    ListProduct: null,
    ListByBrandRequest: async(brandId) => {
        try {
            set({ ListProduct: null });
            const res = await axios.get(`/api/v1/ProductListByBrand/${brandId}`);
            if (res.data.status === "success") {
                set({ ListProduct: res.data.data });
            }
        } catch (e) {
            console.error("ListByBrandRequest Error:", e);
        }
    },

    ListByCategoryRequest: async(categoryId) => {
        try {
            set({ ListProduct: null });
            const res = await axios.get(`/api/v1/ProductListByCategory/${categoryId}`);
            if (res.data.status === "success") {
                set({ ListProduct: res.data.data });
            }
        } catch (e) {
            console.error("ListByCategoryRequest Error:", e);
        }
    },

    ListByKeywordRequest: async(keyword) => {
        try {
            set({ ListProduct: null });
            const res = await axios.get(`/api/v1/ProductListByKeyword/${keyword}`);
            if (res.data.status === "success") {
                set({ ListProduct: res.data.data });
            }
        } catch (e) {
            console.error("ListByKeywordRequest Error:", e);
        }
    },

    ListByFilterRequest: async(postBody) => {
        try {
            set({ ListProduct: null });
            const res = await axios.post(`/api/v1/ProductListByFilter`, postBody);
            if (res.data.status === "success") {
                set({ ListProduct: res.data.data });
            }
        } catch (e) {
            console.error("ListByFilterRequest Error:", e);
        }
    },

    SearchKeyword: "",
    SetSearchKeyword: (keyword) => {
        set({ SearchKeyword: keyword });
    },

    Details: null,
    DetailsRequest: async(id) => {
        try {
            console.log("Fetching details for ID:", id);
            set({ Details: null });
            const res = await axios.get(`/api/v1/ProductDetails/${id}`);
            console.log("Details API response:", res.data);
            if (res.data.status === "success") {
                set({ Details: res.data.data });
            }
        } catch (e) {
            console.error("DetailsRequest Error:", e);
        }
    },

    ReviewList: null,
    ReviewListRequest: async(id) => {
        try {
            set({ ReviewList: null });
            const res = await axios.get(`/api/v1/ProductReviewList/${id}`);
            if (res.data.status === "success") {
                set({ ReviewList: res.data.data });
            }
        } catch (e) {
            console.error("ReviewListRequest Error:", e);
        }
    }
}));

export default ProductStore;