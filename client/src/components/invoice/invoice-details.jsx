import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CartStore from './../../store/CartStore';
import ReviewStore from '../../store/ReviewStore';
import ValidationHelper from './../../utility/ValidationHelper';
import { toast } from 'react-hot-toast';
import ProductsSkeleton from '../../skeleton/products-skeleton';
import NoData from '../layout/no-data';
import { Modal } from 'react-bootstrap';
import ReviewSubmitButton from './ReviewSubmitButton';

const InvoiceDetails = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const { InvoiceDetails, InvoiceDetailsRequest } = CartStore();
  const { ReviewFormData, ReviewFormOnChange, ReviewSaveRequest } = ReviewStore();

  useEffect(() => {
    (async () => {
      await InvoiceDetailsRequest(id);
    })();
  }, [id]);

  const ReviewModel = (productId) => {
    setShow(true);
    ReviewFormOnChange("productId", productId);
  };

  const submitReview = async () => {
    if (ValidationHelper.IsEmpty(ReviewFormData.des)) {
      toast.error("Review Required");
    } else if (ValidationHelper.IsEmpty(ReviewFormData.rating)) {
      toast.error("Rating Required");
    } else {
      let res = await ReviewSaveRequest(ReviewFormData);
      if (res) {
        toast.success("New Review Created");
        setShow(false);
      } else {
        toast.error("Something Went Wrong");
      }
    }
  };

  if (InvoiceDetails === null) {
    return <ProductsSkeleton />;
  } else if (!Array.isArray(InvoiceDetails) || InvoiceDetails.length === 0) {
    return <NoData />;
  }

  return (
    <div className='container mt-3'>
      <button
        className='btn btn-secondary mb-3'
        onClick={() => navigate('/')}
        aria-label="Back to Home"
      >
        &larr; Back to Home
      </button>

      <div className='row'>
        <div className='col-12'>
          <div className='card p-3 p-md-4'>
            <ul className='list-group list-group-flush'>
              {InvoiceDetails.map((item, i) => {
                const product = item?.product || {};
                const title = product?.title || "Unknown Title";
                const image = product?.image || "";
                const unitPrice = parseFloat(item?.price) || 0;
                const qty = parseInt(item?.qty) || 0;
                const total = unitPrice * qty;

                return (
                  <li
                    key={i}
                    className='list-group-item d-flex flex-column flex-md-row align-items-center align-items-md-start gap-3 gap-md-4'
                  >
                    <img
                      className='rounded-1 flex-shrink-0'
                      width={90}
                      height="auto"
                      src={image}
                      alt={title}
                      style={{ maxWidth: '90px', objectFit: 'contain' }}
                    />
                    <div className='flex-grow-1'>
                      <div className='fw-medium h6'>{title}</div>
                      <p className='mb-1'>
                        Unit Price: <strong>{unitPrice.toFixed(2)}</strong>, Total: <strong>{total.toFixed(2)}</strong>
                      </p>
                      <p className='mb-1'>
                        Qty: <strong>{qty}</strong>, Size: <strong>{item?.size || 'N/A'}</strong>, Color: <strong>{item?.color || 'N/A'}</strong>
                      </p>
                    </div>
                    <button
                      onClick={() => ReviewModel(item?.productId)}
                      className='btn btn-success flex-shrink-0'
                      style={{ minWidth: '130px' }}
                    >
                      Create Review
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='container'>
            <div className='row'>
              <div className='col-12 mb-3'>
                <label htmlFor='rating-select' className='form-label'>
                  Rating
                </label>
                <select
                  id='rating-select'
                  className='form-select'
                  value={ReviewFormData.rating || ""}
                  onChange={(e) => ReviewFormOnChange('rating', e.target.value)}
                >
                  <option value="">Select Rating</option>
                  <option value="5">5 star</option>
                  <option value="4">4 star</option>
                  <option value="3">3 star</option>
                  <option value="2">2 star</option>
                  <option value="1">1 star</option>
                </select>
              </div>
              <div className='col-12'>
                <label htmlFor='review-textarea' className='form-label'>
                  Review
                </label>
                <textarea
                  id='review-textarea'
                  className='form-control'
                  rows={4}
                  value={ReviewFormData.des || ""}
                  onChange={(e) => ReviewFormOnChange('des', e.target.value)}
                  placeholder="Write your review here..."
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-dark' onClick={handleClose}>
            Close
          </button>
          <ReviewSubmitButton text="Submit" className="btn btn-success" onClick={submitReview} />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default InvoiceDetails;
