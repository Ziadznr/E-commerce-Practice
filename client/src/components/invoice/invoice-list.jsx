import React, { useEffect } from 'react';
import CartStore from '../../store/CartStore';
import ProductsSkeleton from '../../skeleton/products-skeleton';
import NoData from './../layout/no-data';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const InvoiceList = () => {
    const { InvoiceList, InvoiceListRequest } = CartStore();

    useEffect(() => {
        (async () => {
            await InvoiceListRequest();
        })();
    }, []);

    const generateSingleInvoicePDF = (id) => {
        const target = document.getElementById(`invoice-${id}`);
        if (!target) return;

        html2canvas(target).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`invoice-${id}.pdf`);
        });
    };

    if (InvoiceList === null) {
        return <ProductsSkeleton />;
    } else if (InvoiceList.length === 0) {
        return <NoData />;
    } else {
        return (
            <div className='container mt-3'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='card p-4'>
                            <ul className='list-group list-group-flush'>
                                {
                                    InvoiceList.map((item) => {
                                        return (
                                            <li
                                                key={item._id}
                                                id={`invoice-${item._id}`} // Individual wrapper
                                                className='list-group-item mb-4 p-3 border rounded'
                                            >
                                                <div className='d-flex justify-content-between align-items-start'>
                                                    <div>
                                                        <p className='m-1'><b>Invoice No:</b> {item['tran_id']}</p>
                                                        <p className='m-1'><b>Customer:</b> {item['cus_details']}</p>
                                                        <p className='m-1'><b>Shipping:</b> {item['ship_details']}</p>
                                                        <p className='m-1'><b>Payment:</b> {item['payment_status']}</p>
                                                        <p className='m-1'><b>Delivery:</b> {item['delivery_status']}</p>
                                                    </div>
                                                    <div className='d-flex flex-column align-items-end'>
                                                        <Link
                                                            className="btn btn-success mb-2"
                                                            to={`/invoice/${item['_id']}`}
                                                        >
                                                            Details
                                                        </Link>
                                                        <button
                                                            className='btn btn-primary'
                                                            onClick={() => generateSingleInvoicePDF(item._id)}
                                                        >
                                                            Download PDF
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default InvoiceList;
