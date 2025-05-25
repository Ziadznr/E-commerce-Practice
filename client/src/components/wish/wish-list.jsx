import React, { useEffect } from 'react';
import WishStore from '../../store/WishStore';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import NoData from '../layout/no-data.jsx';
import ProductsSkeleton from '../../skeleton/products-skeleton';

const WishList = () => {
  const { WishListRequest, WishList, RemoveWishListRequest } = WishStore();

  useEffect(() => {
    (async () => {
      await WishListRequest();
    })();
  }, []);

  const remove = async (productId) => {
    await RemoveWishListRequest(productId);
    await WishListRequest();
  };

  if (WishList === null) {
    return (
      <div className="container">
        <div className="row">
          <ProductsSkeleton />
        </div>
      </div>
    );
  } else if (WishList.length === 0) {
    return <NoData />;
  } else {
    return (
      <div className="container mt-3">
        <div className="row g-3">
          {WishList.map((item, i) => {
            let price = (
              <p className="bodyMedium text-dark my-1">Price: ${item.product.price}</p>
            );
            if (item.product.discount === true) {
              price = (
                <p className="bodyMedium text-dark my-1">
                  Price: <strike>${item.product.price}</strike> ${item.product.discount}
                </p>
              );
            }

            return (
              <div
                key={i}
                className="col-12 col-sm-6 col-md-4 col-lg-3 p-2 d-flex align-items-stretch"
              >
                <div className="card shadow-sm rounded-3 bg-white w-100">
                  <img
                    className="w-100 rounded-top"
                    src={item.product.image}
                    alt={item.product.title}
                    style={{ objectFit: 'cover', height: '180px' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <p className="bodySmall text-secondary my-1 flex-grow-1">
                      {item.product.title}
                    </p>
                    {price}
                    <StarRatings
                      rating={parseFloat(item.product.star)}
                      starRatedColor="red"
                      starDimension="15px"
                      starSpacing="2px"
                    />
                    <div className="mt-3 d-flex justify-content-between">
                      <button
                        onClick={async () => {
                          await remove(item.productId);
                        }}
                        className="btn btn-outline-danger btn-sm"
                      >
                        Remove
                      </button>
                      <Link
                        className="btn btn-outline-success btn-sm"
                        to={`/details/${item.productId}`}
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default WishList;
