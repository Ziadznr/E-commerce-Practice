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
    }
}))

export default FeatureStore;