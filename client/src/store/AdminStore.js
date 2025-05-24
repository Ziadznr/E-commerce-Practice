import { create } from 'zustand';
import axios from 'axios';
import Cookies from 'js-cookie';

const useAdminStore = create((set, get) => ({
    admin: null,
    loading: false,
    error: null,
    message: null,
    products: [],
    productDetails: null,
    searchQuery: '',

    // ---------------- AUTH ----------------
    loginAdmin: async(email, password) => {
        try {
            set({ loading: true, error: null, message: null });

            const res = await axios.post('/api/v1/AdminLogin', { email, password }, { withCredentials: true });

            if (res && res.data && res.data.status === 'success') {
                const token = res.data.token;
                Cookies.set('token', token);

                const profile = await fetchAdminProfile();
                if (profile) {
                    set({ admin: profile, message: 'Login successful' });
                    return { admin: profile }; // <== return profile here
                } else {
                    set({ admin: { email: email }, message: 'Login successful (no profile)' });
                    return { admin: { email } }; // <== return minimal admin info
                }
            } else {
                const msg = res.data && res.data.message ? res.data.message : 'Login failed';
                set({ error: msg });
                return { error: msg }; // <== return error message
            }
        } catch (err) {
            const errorMsg = extractErrorMessage(err);
            set({ error: errorMsg });
            return { error: errorMsg }; // <== return error on catch
        } finally {
            set({ loading: false });
        }
    },

    registerAdmin: async(email, password) => {
        try {
            set({ loading: true, error: null, message: null });

            const res = await axios.post('/api/v1/AdminRegister', { email, password });

            if (res && res.data && res.data.status === 'success') {
                set({ message: 'Registration successful. Please log in.' });
            } else {
                const msg = res.data && res.data.message ? res.data.message : 'Registration failed';
                set({ error: msg });
            }
        } catch (err) {
            set({ error: extractErrorMessage(err) });
        } finally {
            set({ loading: false });
        }
    },

    logoutAdmin: async() => {
        try {
            set({ loading: true, error: null, message: null });

            // no Authorization header needed if backend expects cookie auth
            const res = await axios.get('/api/v1/AdminLogout', { withCredentials: true });

            if (res && res.data && res.data.status === 'success') {
                Cookies.remove('token');
                set({ admin: null, message: 'Logged out successfully' });
            } else {
                const msg = res.data && res.data.message ? res.data.message : 'Logout failed';
                set({ error: msg });
            }
        } catch (err) {
            set({ error: extractErrorMessage(err) });
        } finally {
            set({ loading: false });
        }
    },

    fetchAdminProfileManually: async() => {
        try {
            set({ loading: true, error: null });
            const profile = await fetchAdminProfile();
            if (profile) {
                set({ admin: profile });
            } else {
                set({ error: 'Failed to fetch profile' });
            }
        } catch (err) {
            set({ error: extractErrorMessage(err) });
        } finally {
            set({ loading: false });
        }
    },

    // ---------------- PRODUCTS ----------------
    createProduct: async(productData) => {
        try {
            set({ loading: true, error: null, message: null });

            // Optional: Basic frontend validation (example)
            if (!productData.brandId && !productData.brandName) {
                throw new Error("Brand ID or Brand Name is required.");
            }
            if (!productData.categoryId && !productData.categoryName) {
                throw new Error("Category ID or Category Name is required.");
            }
            if (productData.brandName && !productData.brandImg) {
                throw new Error("Brand image is required when creating a new brand.");
            }
            if (productData.categoryName && !productData.categoryImg) {
                throw new Error("Category image is required when creating a new category.");
            }

            // Call backend API
            const res = await axios.post('/api/v1/CreateProduct', productData, {
                withCredentials: true,
            });

            if (res && res.data && res.data.status === 'success') {
                set({ message: res.data.message });
            } else {
                const msg = res.data && res.data.message ? res.data.message : 'Product creation failed';
                set({ error: msg });
            }
        } catch (err) {
            set({ error: err.message || extractErrorMessage(err) });
        } finally {
            set({ loading: false });
        }
    },


    updateProduct: async(productId, productData) => {
        try {
            set({ loading: true, error: null, message: null });

            const res = await axios.put(`/api/v1/UpdateProduct/${productId}`, productData, {
                withCredentials: true,
                // no Authorization header
            });

            if (res && res.data && res.data.status === 'success') {
                set({ message: res.data.message });
            } else {
                const msg = res.data && res.data.message ? res.data.message : 'Product update failed';
                set({ error: msg });
            }
        } catch (err) {
            set({ error: extractErrorMessage(err) });
        } finally {
            set({ loading: false });
        }
    },

    deleteProduct: async(productId) => {
        try {
            set({ loading: true, error: null, message: null });

            const res = await axios.delete(`/api/v1/DeleteProduct/${productId}`, {
                withCredentials: true,
                // no Authorization header
            });

            if (res && res.data && res.data.status === 'success') {
                set({ message: res.data.message });
            } else {
                const msg = res.data && res.data.message ? res.data.message : 'Product deletion failed';
                set({ error: msg });
            }
        } catch (err) {
            set({ error: extractErrorMessage(err) });
        } finally {
            set({ loading: false });
        }
    },

    listProducts: async() => {
        try {
            set({ loading: true, error: null });

            // no Authorization header, just cookies
            const res = await axios.get('/api/v1/ReadProduct', {
                withCredentials: true,
            });

            if (res && res.data && res.data.status === 'success') {
                set({ products: res.data.data });
            } else {
                const msg = res.data && res.data.message ? res.data.message : 'Failed to load products';
                set({ error: msg });
            }
        } catch (err) {
            const errorMsg = extractErrorMessage(err);
            set({ error: errorMsg });
        } finally {
            set({ loading: false });
        }
    },

    fetchProductDetails: async(productId) => {
        try {
            set({ loading: true, error: null });

            const res = await axios.get(`/api/v1/product/${productId}`, {
                withCredentials: true,
            });

            if (res && res.data && res.data.status === 'success') {
                set({ productDetails: res.data.data });
            } else {
                const msg = res.data && res.data.message ? res.data.message : 'Failed to load product details';
                set({ error: msg });
            }
        } catch (err) {
            set({ error: extractErrorMessage(err) });
        } finally {
            set({ loading: false });
        }
    },

    // ---------------- SEARCH ----------------
    setSearchQuery: (query) => {
        set({ searchQuery: query });
    },

    getFilteredProducts: () => {
        const state = get();
        const query = state.searchQuery.trim().toLowerCase();

        if (!query) return state.products;

        return state.products.filter((product) => {
            const title = product.title || '';
            const brandName = product.brand && product.brand.brandName ? product.brand.brandName : '';
            const categoryName = product.category && product.category.categoryName ? product.category.categoryName : '';

            return (
                title.toLowerCase().includes(query) ||
                brandName.toLowerCase().includes(query) ||
                categoryName.toLowerCase().includes(query)
            );
        });
    },
}));

// ---------------- HELPERS ----------------
const extractErrorMessage = (err) => {
    if (err && err.response && err.response.data && err.response.data.message) {
        return err.response.data.message;
    }
    return 'Something went wrong';
};

const fetchAdminProfile = async() => {
    try {
        const token = Cookies.get('token');
        if (!token) return null;

        const res = await axios.get('/api/v1/ReadProfile', {
            headers: {
                Authorization: 'Bearer ' + token, // Only here, profile endpoint expects token in header
            },
            withCredentials: true,
        });

        if (res && res.data && res.data.status === 'success') {
            return res.data.data;
        }
    } catch (err) {
        console.error('Profile fetch failed:', err);
    }
    return null;
};

export default useAdminStore;