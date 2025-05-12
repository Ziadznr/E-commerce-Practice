import React, { useEffect } from 'react';
import Layout from '../components/layout/layout';
import LegalContents from '../components/features/legal-contents';
import FeatureStore from '../store/FeatureStore';

const ComplainPage = () => {
   const {LegalDetailsRequest}=FeatureStore();
    useEffect(()=>{
        (async()=> {
            await LegalDetailsRequest('complain')
        })();
        
    },[])
    return (
        <Layout>
            <LegalContents/>
        </Layout>
    );

};

export default ComplainPage;