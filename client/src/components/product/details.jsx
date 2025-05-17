import React, { useState } from 'react';
import ProductStore from '../../store/ProductStore';
import DetailsSkeleton from '../../skeleton/details-skeleton';
import parse from 'html-react-parser';
import ProductImages from './ProductImages';
import Reviews from './reviews';
import CartSubmitButton from '../cart/CartSubmitButton';
import { toast } from 'react-hot-toast';
import UserStore from './../../store/UserStore';
import CartStore from '../../store/CartStore';
import WishStore from '../../store/WishStore';
import WishSubmitButton from '../wish/WishSubmitButton';

const Details = () => {
  const { Details } = ProductStore();
  const [Quantity, SetQuantity] = useState(1);
  const{CartSaveRequest,CartForm,CartListRequest,CartFormChange}=CartStore();
  const{WishSaveRequest,WishListRequest}=WishStore();
 const incrementQuantity = () => {
  const newQty = String(Number(Quantity) + 1);
  SetQuantity(Number(newQty));
  CartFormChange('qty', newQty);
};

const decrementQuantity = () => {
  if (Number(Quantity) > 1) {
    const newQty = String(Number(Quantity) - 1);
    SetQuantity(Number(newQty));
    CartFormChange('qty', newQty);
  }
};

const AddWish=async(productId)=>{
    let res= await WishSaveRequest(productId)

    if(res){
      toast.success("Cart Item Added")
      await WishListRequest();
    }
  }


  const AddCart=async(productId)=>{
    let res= await CartSaveRequest(CartForm,productId)

    if(res){
      toast.success("Wish Item Added")
      await CartListRequest();
    }
  }

  if (Details === null) {
    return <DetailsSkeleton />;
  } else {
    const sizeOptions = Details[0]['details']['size'].split(',');
    const colorOptions = Details[0]['details']['color'].split(',');

    return (
      <div className="container mt-2">
        <div className="row">
          {/* Product Images */}
          <div className="col-md-5 p-3">
            <ProductImages />
          </div>

          {/* Product Info */}
          <div className="col-md-5 p-3">
            <h5>{Details[0]['title']}</h5>
            <p className="text-muted bodySm1 my-1">Category: {Details[0]['category']['categoryName']}</p>
            <p className="text-muted bodySm1 my-1">Brand: {Details[0]['brand']['brandName']}</p>
            <p className="bodySmal mb-2 mt-1">{Details[0]['shortDes']}</p>

            {
              Details[0]['discount'] ? (
                <span className="bodyXLarge">
                  Price: <strike className="text-secondary">{Details[0]['price']}</strike> {Details[0]['discountPrice']}
                </span>
              ) : (
                <span className="bodyXLarge">Price: {Details[0]['price']}</span>
              )
            }

            <div className="row">
              <div className="col-4 p-2">
                <label className="bodySmal">Size</label>
                <select value={CartForm.size} onChange={(e)=>{CartFormChange('size',e.target.value)}} className="form-control my-2 form-select">
                  <option value="">Size</option>
                  {sizeOptions.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div className="col-4 p-2">
                <label className="bodySmal">Color</label>
                <select value={CartForm.color} onChange={(e)=>{CartFormChange('color',e.target.value)}} className="form-control my-2 form-select">
                  <option value="">Color</option>
                  {colorOptions.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
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
                <CartSubmitButton onClick={async()=>{await AddCart(Details[0]['_id'])}} className="btn w-100 btn-sm btn-success" text="Add to Cart"/>
              </div>

              <div className="col-4 p-2">
                <WishSubmitButton onClick={async()=>{await AddWish(Details[0]['_id'])}} className="btn w-100 btn-sm btn-success" text="Add to Wish"/>
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
              {parse(Details[0]['details']['des'])}
            </div>

            <div
              className="tab-pane fade"
              id="review-tab-pane"
              role="tabpanel"
              aria-labelledby="review-tab"
              tabIndex="0"
            >
              <Reviews />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Details;
