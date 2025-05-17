import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CartStore from './../../store/CartStore';
import ReviewStore from '../../store/ReviewStore';
import ValidationHelper from './../../utility/ValidationHelper';
import {toast} from 'react-hot-toast';
import ProductsSkeleton from '../../skeleton/products-skeleton';
import NoData from '../layout/no-data';
import { Modal } from 'react-bootstrap'; 
import ReviewSubmitButton from './ReviewSubmitButton';

const InvoiceDetails = () => {

    const [show,setShow]=useState(false)
    const handleClose=()=> setShow(false)

    let {ReviewFormData,ReviewFormOnChange,ReviewSaveRequest}=ReviewStore();
    const ReviewModel=(id)=>{
        setShow(true);
        ReviewFormOnChange("productId",id)
    }

    const {id}=useParams();
    let {InvoiceDetails,InvoiceDetailsRequest}=CartStore()
    

    useEffect(()=>{
                (async()=>{
                    await InvoiceDetailsRequest(id);
                })()
            },[id]);

    const submitReview=async()=>{
       if (ValidationHelper.IsEmpty(ReviewFormData.des)) {
    toast.error("Review Required")
} else if (ValidationHelper.IsEmpty(ReviewFormData.rating)) {
    toast.error("Rating Required")
} else {
    let res = await ReviewSaveRequest(ReviewFormData);
    if (res) {
        toast.success("New Review Created");
        setShow(false);
    } else {
        toast.error("Something Went Wrong");
    }
}

    } 
    
    if(InvoiceDetails===null){
        return <ProductsSkeleton/>
    }
    else if (InvoiceDetails.length===0) {
        return(
            <NoData/>
        )
    }
    else{
 return (
        <div className=' container mt-3'>
            <div className=' row'>
                <div className=' col-md-12'>
                    <div className=' card p-4'>
                        <ul className=' list-group list-group-flush'>
                            {
                                InvoiceDetails.map((item,i)=>{
                                    return(
                                        <li key={i}  className=' list-group-item d-flex justify-content-center align-top'>
                                            <img className=' rounded-1' width="90" height=" auto" src={item['product']['image']} alt="" />
                                            <div className=' ms-2 ms-auto'>
                                                <div className=' fw-medium h6'>
                                                    {item['product']['title']}
                                                </div>
                                                <span>Unit Price:{item['price']}, Total:{item['price']*parseInt(item['qty'])}</span>
                                                <span>Qty: {item['qty']}, Size: {item['size']}, Color: {item['color']}</span>
                                            </div>
                                            <button onClick={()=>ReviewModel(item['productId'])} className='btn btn-success'>Create Review</button>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <h6>Create Review</h6>
                </Modal.Header>
                <Modal.Body>
                    <div className=' container'>
                        <div className=' row'>
                            <div className=' col-12 p-2'>
                                <label className=' form-label'>Rating</label>
                                <select onChange={(e)=>ReviewFormOnChange('rating',e.target.value)} className=' form-select'>
                                    <option value="5">5 star</option>
                                    <option value="4">4 star</option>
                                    <option value="3">3 star</option>
                                    <option value="2">2 star</option>
                                    <option value="1">1 star</option>
                                </select>
                            </div>
                            <div className=' col-12 p-2'>
                                <label className=' form-label'>Reviews</label>
                                <textarea onChange={(e)=>ReviewFormOnChange('des',e.target.value)} className=' form-control' name="" id=""></textarea>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className=' btn btn-dark' onClick={handleClose}>Close</button>
                    <ReviewSubmitButton text="Submit" className="btn btn-success" onClick={submitReview}/>
                </Modal.Footer>
            </Modal>
        </div>
    );
    }


   
};

export default InvoiceDetails;