import React, { useEffect } from 'react';
import WishStore from '../../store/WishStore';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import NoData from '../layout/no-data.jsx';
import ProductsSkeleton from '../../skeleton/products-skeleton';

const WishList = () => {
  const { WishListRequest, WishList, RemoveWishListRequest } = WishStore();
  const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5020';

  useEffect(() => {
    (async () => {
      await WishListRequest();
    })();
  }, []);

  const getImageUrl = (imgPath) => {
    if (!imgPath) return 'https://via.placeholder.com/300x180?text=No+Image';
    if (imgPath.startsWith('http')) return imgPath;

    const cleanPath = imgPath.replace(/^\/+/, '').replace(/^uploads\//, '').replace(/\/+$/, '');
    return `${baseURL}/uploads/${cleanPath}`;
  };

  const remove = async (productId) => {
    await RemoveWishListRequest(productId);
    await WishListRequest(); // Refresh after removal
  };

  if (WishList === null) {
    return (
      <div className="container">
        <div className="row">
          <ProductsSkeleton />
        </div>
      </div>
    );
  }

  if (WishList.length === 0) {
    return <NoData />;
  }

  return (
    <div className="container mt-3">
      <div className="row g-3">
        {WishList.map((item) => {
          const price = item.product.discount ? (
            <p className="bodyMedium text-dark my-1">
              Price: <strike>BDT{item.product.price}</strike> BDT {item.product.discountPrice}
            </p>
          ) : (
            <p className="bodyMedium text-dark my-1">Price: BDT {item.product.price}</p>
          );

          const imageURL = getImageUrl(item.product.image);

          console.log(`Wishlist Image Debug: ${item.product.title}`, {
            original: item.product.image,
            resolved: imageURL,
          });

          return (
            <div
              key={item.productId}
              className="col-12 col-sm-6 col-md-4 col-lg-3 p-2 d-flex align-items-stretch"
            >
              <div className="card shadow-sm rounded-3 bg-white w-100">
                <img
                  className="w-100 rounded-top"
                  src={imageURL}
                  alt={item.product.title}
                  style={{ objectFit: 'cover', height: '180px' }}
                  loading="lazy"
                  onError={(e) => {
                    console.error('Wishlist image load failed:', {
                      product: item.product.title,
                      attemptedURL: imageURL,
                    });
                    e.target.src = 'https://via.placeholder.com/300x180?text=No+Image';
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <p className="bodySmall text-secondary my-1 flex-grow-1">
                    {item.product.title}
                  </p>
                  {price}
                  <StarRatings
                    rating={parseFloat(item.product.star) || 0}
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
};

export default WishList;
