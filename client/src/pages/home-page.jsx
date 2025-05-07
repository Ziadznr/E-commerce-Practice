import React, { useEffect } from 'react';
import Layout from '../components/layout/layout';
import SliderSkeleton from '../skeleton/slider-skeleton';
import FeaturesSkeleton from '../skeleton/features-skeleton';
import CategoriesSkeleton from '../skeleton/categories-skeleton';
import ProductsSkeleton from './../skeleton/products-skeleton';
import BrandsSkeleton from './../skeleton/brands-skeleton';
import Brands from '../components/product/brands';
import ProductStore from '../store/ProductStore';
import FeatureStore from './../store/FeatureStore';
import Slider from './../components/product/slider';
import Features from './../components/features/features';
import Categories from './../components/product/categories';
import Products from './../components/product/products';

const HomePage = () => {
    const { BrandListRequest, SliderListRequest, CategoryListRequest, ListByRemarkRequest } = ProductStore();
    const { FeatureListRequest } = FeatureStore();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await SliderListRequest();
                await FeatureListRequest();
                await CategoryListRequest();
                await ListByRemarkRequest("new");
                await BrandListRequest();
            } catch (error) {
                console.error('Failed to load homepage data', error);
            }
        };
        fetchData();
    }, []);

    return (
        <Layout>
            <Slider />
            <Features />
            <Categories />
            <Products />
            <Brands />
        </Layout>
    );
};

export default HomePage;
