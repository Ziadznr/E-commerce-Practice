import React, { useEffect } from 'react';
import Layout from '../components/layout/layout';
import LegalContents from '../components/features/legal-contents';
import FeatureStore from '../store/FeatureStore';

const HowToBuyPage = () => {
   const {LegalDetailsRequest}=FeatureStore();
    useEffect(()=>{
        (async()=> {
            await LegalDetailsRequest('howtobuy')
        })();
        
    },[])
    return (
        <Layout>
            <LegalContents/>
        </Layout>
    );
};

export default HowToBuyPage;