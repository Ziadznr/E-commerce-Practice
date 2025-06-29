import React, { useEffect } from 'react';
import CartStore from '../../store/CartStore';
import ProductsSkeleton from '../../skeleton/products-skeleton';
import NoData from '../layout/no-data';
import CartSubmitButton from './CartSubmitButton';

const CartList = () => {
  const {
    CartListRequest,
    CartList,
    CreateInvoiceRequest,
    RemoveCartListRequest,
    CartPayableTotal,
    CartTotal,
    CartVatTotal,
  } = CartStore();

  const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5020';

  const getImageUrl = (imgPath) => {
    if (!imgPath) return 'https://via.placeholder.com/300x180?text=No+Image';

    // If already full URL
    if (imgPath.startsWith('http')) return imgPath;

    // Clean path (remove leading/trailing slashes and duplicate uploads/)
    const cleanPath = imgPath
      .replace(/^\/+/, '')
      .replace(/^uploads\//, '')
      .replace(/\/+$/, '');

    return `${baseURL}/uploads/${cleanPath}`;
  };

  useEffect(() => {
    (async () => {
      await CartListRequest();
    })();
  }, []);

  const remove = async (cartId) => {
    await RemoveCartListRequest(cartId);
    await CartListRequest();
  };

  if (CartList === null) {
    return <ProductsSkeleton />;
  } else if (CartList.length === 0) {
    return <NoData />;
  } else {
    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-12">
            <div className="card p-3">
              <ul className="list-group list-group-flush">
                {CartList.map((item) => {
                  let price = item['product']['price'];
                  if (item['product']['discount'] === true) {
                    price = item['product']['discountPrice'];
                  }

                  const imageURL = getImageUrl(item['product']['image']);
                  console.log(`Cart Image Debug: ${item['product']['title']}`, {
                    original: item['product']['image'],
                    resolved: imageURL
                  });

                  return (
                    <li
                      key={item['_id']}
                      className="list-group-item d-flex flex-column flex-md-row align-items-md-center justify-content-between"
                    >
                      <div className="d-flex align-items-start align-items-md-center">
                        <img
                          className="rounded-1 me-3 mb-2 mb-md-0"
                          width="90"
                          height="90"
                          src={imageURL}
                          alt={item['product']['title']}
                          style={{ objectFit: 'cover' }}
                          loading="lazy"
                          onError={(e) => {
                            console.error('Cart image load failed:', {
                              product: item['product']['title'],
                              attemptedURL: imageURL
                            });
                            e.target.src = 'https://via.placeholder.com/90x90?text=No+Image';
                          }}
                        />
                        <div>
                          <p className="fw-lighter m-0">{item['product']['title']}</p>
                          <p className="fw-lighter my-1">
                            Unit Price: {price}, Qty: {item['qty']}, Size: {item['size']}, Color: {item['color']}
                          </p>
                          <p className="h6 fw-bold m-0 text-dark">
                            <b>Total</b>: <i className="bi bi-cash"> </i>
                            {parseInt(price) * parseInt(item['qty'])}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => remove(item['_id'])}
                        className="btn btn-sm btn-outline-danger mt-2 mt-md-0"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="my-4">
                <ul className="list-group bg-transparent list-group-flush">
                  <li className="list-group-item bg-transparent h6 m-0 text-dark">
                    <span className="float-end">
                      Total: <i className="bi bi-cash">{CartTotal}</i>
                    </span>
                  </li>
                  <li className="list-group-item bg-transparent h6 m-0 text-dark">
                    <span className="float-end">
                      Vat(5%): <i className="bi bi-cash">{CartVatTotal}</i>
                    </span>
                  </li>
                  <li className="list-group-item bg-transparent h6 m-0 text-dark">
                    <span className="float-end">
                      Payable: <i className="bi bi-cash">{CartPayableTotal}</i>
                    </span>
                  </li>
                  <li className="list-group-item bg-transparent h6 m-0 text-dark text-end">
                    <CartSubmitButton
                      text="Check Out"
                      onClick={async () => {
                        await CreateInvoiceRequest();
                      }}
                      className="btn px-5 mt-3 btn-success"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CartList;