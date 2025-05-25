import React, { useEffect } from 'react';
import ProductStore from './../../store/ProductStore';
import BrandsSkeleton from '../../skeleton/brands-skeleton';
import { Link } from 'react-router-dom';

const Brands = () => {
  const { BrandList } = ProductStore();

  useEffect(() => {
    console.log('BrandList:', BrandList);
  }, [BrandList]);

  if (!BrandList || BrandList.length === 0) {
    return <BrandsSkeleton />;
  }

  return (
    <div className="section">
      <div className="container">
        <h2 className="text-center my-4">Top Brands</h2>
        <p className="text-center mb-5 small">
          Explore a World of Choices Across Our Most Popular <br />
          Shopping Categories
        </p>

        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
          {BrandList.map((item, i) => (
            <div key={i} className="col text-center">
              <Link to={`/by-brand/${item._id}`} className="card h-100 border-0 shadow-sm rounded-4">
                <div className="card-body d-flex flex-column align-items-center">
                  <img className="img-fluid w-75" src={item.brandImg} alt={item.brandName} />
                  <p className="mt-3 mb-0 small">{item.brandName}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;
