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

                  return (
                    <li
                      key={item['_id']}
                      className="list-group-item d-flex flex-column flex-md-row align-items-md-center justify-content-between"
                    >
                      <div className="d-flex align-items-start align-items-md-center">
                        <img
                          className="rounded-1 me-3 mb-2 mb-md-0"
                          width="90"
                          src={item['product']['image']}
                          alt=""
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
