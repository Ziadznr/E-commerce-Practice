import React, { useState, useEffect } from 'react';
import ProductStore from '../../store/ProductStore';
import { Link } from 'react-router-dom';
import ProductsSkeleton from '../../skeleton/products-skeleton';
import StarRatings from 'react-star-ratings';

const ProductList = () => {
  const {
    ListProduct,
    BrandListRequest,
    BrandList,
    CategoryListRequest,
    CategoryList,
    ListByFilterRequest,
  } = ProductStore();

  const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5020';

  const [Filter, SetFilter] = useState({
    brandId: '',
    categoryId: '',
    priceMax: '',
    priceMin: '',
  });

  const getImageUrl = (imgPath) => {
    if (!imgPath) return 'https://via.placeholder.com/300x300?text=No+Image';

    // If full URL, return as-is
    if (imgPath.startsWith('http')) return imgPath;

    // Normalize: remove leading slash only
    const cleanPath = imgPath.replace(/^\/+/, '');

    return `${baseURL}/${cleanPath}`;
  };

  const inputOnChange = (name, value) => {
    SetFilter((data) => ({
      ...data,
      [name]: value,
    }));
  };

  useEffect(() => {
    (async () => {
      if (BrandList === null) await BrandListRequest();
      if (CategoryList === null) await CategoryListRequest();

      const isEveryFilterPropertyEmpty = Object.values(Filter).every(
        (value) => value === '' || value === 0
      );
      if (!isEveryFilterPropertyEmpty) {
        await ListByFilterRequest(Filter);
      }
    })();
  }, [Filter]);

  return (
    <div className="container mt-3">
      <div className="row">
        {/* Filters */}
        <aside className="col-12 col-md-3 mb-4">
          <div className="card vh-md-100 p-3 shadow-sm">
            <label className="form-label mt-3">Brands</label>
            <select
              value={Filter.brandId}
              onChange={(e) => inputOnChange('brandId', e.target.value)}
              className="form-select"
            >
              <option value="">Choose Brand</option>
              {BrandList?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.brandName}
                </option>
              ))}
            </select>

            <label className="form-label mt-3">Categories</label>
            <select
              value={Filter.categoryId}
              onChange={(e) => inputOnChange('categoryId', e.target.value)}
              className="form-select"
            >
              <option value="">Choose Category</option>
              {CategoryList?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.categoryName}
                </option>
              ))}
            </select>

            <label className="form-label mt-3">
              Maximum Price TK {Filter.priceMax || 0}
            </label>
            <input
              value={Filter.priceMax}
              onChange={(e) => inputOnChange('priceMax', e.target.value)}
              min={0}
              max={100000}
              step={1000}
              type="range"
              className="form-range"
            />

            <label className="form-label mt-3">
              Minimum Price TK {Filter.priceMin || 0}
            </label>
            <input
              value={Filter.priceMin}
              onChange={(e) => inputOnChange('priceMin', e.target.value)}
              min={0}
              max={100000}
              step={1000}
              type="range"
              className="form-range"
            />
          </div>
        </aside>

        {/* Product Grid */}
        <section className="col-12 col-md-9">
          <div className="row g-3">
            {ListProduct === null ? (
              <ProductsSkeleton />
            ) : ListProduct.length === 0 ? (
              <p className="text-center">No products found matching filters.</p>
            ) : (
              ListProduct.map((item) => {
                const imageURL = getImageUrl(item.image);

                const price = item.discount ? (
                  <p className="bodyMedium text-dark mb-1">
                    Price: <strike>BDT{item.price}</strike> BDT{item.discountPrice}
                  </p>
                ) : (
                  <p className="bodyMedium text-dark mb-1">Price: BDT{item.price}</p>
                );

                return (
                  <div key={item._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <Link
                      to={`/details/${item._id}`}
                      className="card shadow-sm h-100 border-0 rounded-4 bg-white text-decoration-none"
                    >
                      <img
                        className="w-100 rounded-top-4"
                        src={imageURL}
                        alt={item.title}
                        loading="lazy"
                        onError={(e) => {
                          console.error('Product image load failed:', {
                            product: item.title,
                            attemptedURL: imageURL,
                          });
                          e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                        }}
                      />
                      <div className="card-body">
                        <p className="bodySmal text-secondary mb-1">{item.title}</p>
                        {price}
                        <StarRatings
                          rating={parseFloat(item.star) || 0}
                          starRatedColor="gold"
                          numberOfStars={5}
                          starDimension="20px"
                          starSpacing="3px"
                        />
                      </div>
                    </Link>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductList;
