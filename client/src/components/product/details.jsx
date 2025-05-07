import React, { useState } from 'react';
import ProductStore from '../../store/ProductStore';
import DetailsSkeleton from '../../skeleton/details-skeleton';
import parse from 'html-react-parser';
import ProductImages from './ProductImages';
import Reviews from './reviews';

const Details = () => {

    const {Details}=ProductStore();
    const [Quantity,SetQuantity]=useState(1);

    const incrementQuantity=()=>{
      SetQuantity(Quantity=>Quantity+1)
    }

    const decrementQuantity=()=>{
      if(Quantity>1){
        SetQuantity(Quantity=>Quantity-1)
      }
      
    }
    if(Details===null){
        return <DetailsSkeleton/>
    }else{
        return (
            <div className="container mt-2">
      <div className="row">
        {/* Product Images */}
        <div className="col-md-5 p-3">
    
        <ProductImages/>
        </div>
    
        {/* Product Info */}
        <div className="col-md-5 p-3">
          <h5>{Details[0]['title']}</h5>
          <p className="text-muted bodySm1 my-1">Category: {Details[0]['category']['categoryName']}</p>
          <p className="text-muted bodySm1 my-1">Brand: {Details[0]['brand']['brandName']}</p>
          <p className="bodySmal mb-2 mt-1">{Details[0]['shortDes']}</p>
    
      {
        Details[0]['discount']?(
          <span className=' bodyXLarge'>Price: <strike className="text-secondary">{Details[0]['price']}</strike> {Details[0]['discountPrice']}</span>
        ):(
          <span className=' bodyXLarge'>Price: {Details[0]['price']}</span>
        )
      }
          
          
        <div className=' row'>
          <div className="col-4 p-2">
            <label className="bodySmal">Size</label>
            <select className="form-control my-2 form-select">
              <option value="">Size</option>
              {
                Details[0]['details']['size'].split(",").map((item)=>{
                  return <option value={item}>{item}</option>
                })
              }
            </select>
          </div>
    
          <div className="col-4 p-2">
            <label className="bodySmal">Color</label>
            <select className="form-control my-2 form-select">
              <option value="">Color</option>
              {
                Details[0]['details']['color'].split(",").map((item)=>{
                  return <option value={item}>{item}</option>
                })
              }
            </select>
          </div>
          
          <div className="col-4 p-2">
            <label className="bodySmal">Quantity</label>
            <div className="input-group my-2">
              <button onClick={decrementQuantity} className="btn btn-outline-secondary">-</button>
              <input
                type="text"
                className="form-control bg-light text-center"
                readOnly
                value={Quantity}
              />
              <button onClick={incrementQuantity} className="btn btn-outline-secondary">+</button>
            </div>
          </div>
    
          <div className="col-4 p-2">
            <button className="btn w-100 btn-sm btn-success">Add to Cart</button>
          </div>
    
          <div className="col-4 p-2">
            <button className="btn w-100 btn-sm btn-danger">Add to Wishlist</button>
          </div>
        </div>
      </div>
      </div>
      {/* Tabs */}
      <div className="row mt-3">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="spec-tab"
              data-bs-toggle="tab"
              data-bs-target="#spec-tab-pane"
              type="button"
              role="tab"
            >
              Specifications
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="review-tab"
              data-bs-toggle="tab"
              data-bs-target="#review-tab-pane"
              type="button"
              role="tab"
            >
              Reviews
            </button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="spec-tab-pane"
            role="tabpanel"
            aria-labelledby="spec-tab"
            tabIndex="0"
          >
            {
              parse(Details[0]['details']['des'])
            }
          </div>
          <div
            className="tab-pane fade"
            id="review-tab-pane"
            role="tabpanel"
            aria-labelledby="review-tab"
            tabIndex="0"
          >
          <Reviews/>
          
        </div>
      </div>
    </div>
    </div>
        );
    }
   
};

export default Details;