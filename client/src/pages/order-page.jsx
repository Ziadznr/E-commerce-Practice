import React from 'react';
import Layout from './../components/layout/layout';
import InvoiceList from '../components/invoice/invoice-list';

const OrderPage = () => {
    return (
        <Layout>
            <InvoiceList/>
        </Layout>
    );
};

export default OrderPage;