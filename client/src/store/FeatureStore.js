import { create } from 'zustand';
import axios from 'axios';



const FeatureStore = create((set) => ({
    FeaturesList: null,
    FeatureListRequest: async() => {

        let res = await axios.get('/api/v1/FeatureList');
        if (res.data['status'] === "success") {
            set({
                FeaturesList: res.data['data']

            })
        }
    },

    LegalDetails: null,
    LegalDetailsRequest: async(type) => {
        set({
            LegalDetails: null

        })
        let res = await axios.get(`/api/v1/LegalDetails/${type}`);
        if (res.data['status'] === "success") {
            set({
                LegalDetails: res.data['data']

            })
        }
    }
}))

export default FeatureStore;