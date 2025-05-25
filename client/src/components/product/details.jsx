import React, { useState } from 'react';
import ProductStore from '../../store/ProductStore';
import DetailsSkeleton from '../../skeleton/details-skeleton';
import parse from 'html-react-parser';
import ProductImages from './ProductImages';
import Reviews from './reviews';
import CartSubmitButton from '../cart/CartSubmitButton';
import { toast } from 'react-hot-toast';
import CartStore from '../../store/CartStore';
import WishStore from '../../store/WishStore';
import WishSubmitButton from '../wish/WishSubmitButton';

const Details = () => {
  const { Details } = ProductStore();
  const [Quantity, SetQuantity] = useState(1);
  const { CartSaveRequest, CartForm, CartListRequest, CartFormChange } = CartStore();
  const { WishSaveRequest, WishListRequest } = WishStore();

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

  const AddWish = async (productId) => {
    let res = await WishSaveRequest(productId);
    if (res) {
      toast.success('Wish Item Added');
      await WishListRequest();
    }
  };

  const AddCart = async (productId) => {
    let res = await CartSaveRequest(CartForm, productId);
    if (res) {
      toast.success('Cart Item Added');
      await CartListRequest();
    }
  };

  if (Details === null) return <DetailsSkeleton />;

  const sizeOptions = Details[0]['details']['size'].split(',');
  const colorOptions = Details[0]['details']['color'].split(',');

  return (
    <div className="container mt-3">
      <div className="row flex-column-reverse flex-md-row">
        {/* Product Info */}
        <div className="col-12 col-md-6 p-3">
          <h5>{Details[0]['title']}</h5>
          <p className="text-muted small">Category: {Details[0]['category']['categoryName']}</p>
          <p className="text-muted small">Brand: {Details[0]['brand']['brandName']}</p>
          <p className="mb-2">{Details[0]['shortDes']}</p>

          {Details[0]['discount'] ? (
            <p className="fw-bold fs-5">
              Price: <strike className="text-secondary">{Details[0]['price']}</strike>{' '}
              {Details[0]['discountPrice']}
            </p>
          ) : (
            <p className="fw-bold fs-5">Price: {Details[0]['price']}</p>
          )}

          <div className="row">
            {/* Size */}
            <div className="col-6 col-md-4 mb-3">
              <label className="form-label small">Size</label>
              <select
                value={CartForm.size}
                onChange={(e) => CartFormChange('size', e.target.value)}
                className="form-select"
              >
                <option value="">Select</option>
                {sizeOptions.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            {/* Color */}
            <div className="col-6 col-md-4 mb-3">
              <label className="form-label small">Color</label>
              <select
                value={CartForm.color}
                onChange={(e) => CartFormChange('color', e.target.value)}
                className="form-select"
              >
                <option value="">Select</option>
                {colorOptions.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div className="col-12 col-md-4 mb-3">
              <label className="form-label small">Quantity</label>
              <div className="input-group">
                <button onClick={decrementQuantity} className="btn btn-outline-secondary">-</button>
                <input type="text" className="form-control text-center" value={Quantity} readOnly />
                <button onClick={incrementQuantity} className="btn btn-outline-secondary">+</button>
              </div>
            </div>

            {/* Buttons */}
            <div className="col-6 mb-3">
              <CartSubmitButton
                onClick={async () => await AddCart(Details[0]['_id'])}
                className="btn btn-success w-100"
                text="Add to Cart"
              />
            </div>
            <div className="col-6 mb-3">
              <WishSubmitButton
                onClick={async () => await AddWish(Details[0]['_id'])}
                className="btn btn-outline-primary w-100"
                text="Add to Wish"
              />
            </div>
          </div>
        </div>

        {/* Product Images */}
        <div className="col-12 col-md-6 p-3">
          <ProductImages />
        </div>
      </div>

      {/* Tabs */}
      <div className="row mt-4">
        <ul className="nav nav-tabs" id="productTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="spec-tab"
              data-bs-toggle="tab"
              data-bs-target="#spec"
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
              data-bs-target="#review"
              type="button"
              role="tab"
            >
              Reviews
            </button>
          </li>
        </ul>

        <div className="tab-content p-3 border border-top-0" id="productTabContent">
          <div className="tab-pane fade show active" id="spec" role="tabpanel">
            {parse(Details[0]['details']['des'])}
          </div>
          <div className="tab-pane fade" id="review" role="tabpanel">
            <Reviews />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
