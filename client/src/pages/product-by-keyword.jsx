import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/layout';
import ProductList from '../components/product/product-list';
import ProductStore from '../store/ProductStore';

const ProductByKeyword = () => {
  const { keyword } = useParams();
  const { ListByKeywordRequest } = ProductStore();

  useEffect(() => {
    if (keyword) {
      (async () => {
        await ListByKeywordRequest(keyword);
      })();
    }
  }, [keyword]);

  return (
    <Layout>
      <ProductList />
    </Layout>
  );
};

export default ProductByKeyword;
