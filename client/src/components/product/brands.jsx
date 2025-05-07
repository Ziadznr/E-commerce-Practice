import React, { useEffect } from 'react';
import ProductStore from './../../store/ProductStore';
import BrandsSkeleton from '../../skeleton/brands-skeleton';
import { Link } from 'react-router-dom';

const Brands = () => {
  const { BrandList } = ProductStore();

  // Debug or future reactive logic
  useEffect(() => {
    console.log('BrandList:', BrandList);
  }, [BrandList]);

  if (!BrandList || BrandList.length === 0) {
    return <BrandsSkeleton />;
  }

  return (
    <div className="section">
      <div className="container">
        <div className="row">
          <h1 className="headline-4 text-center my-2 p-0">Top Brands</h1>
          <span className="bodySmall mb-5 text-center">
            Explore a World of Choices Across Our Most Popular <br />
            Shopping Categories
          </span>

          {BrandList.map((item, i) => (
            <div key={i} className="col-6 col-md-4 col-lg-3 p-2 text-center">
              <Link to={`/by-brand/${item._id}`} className="card h-100 rounded-4 bg-white">
                <div className="card-body">
                  <img className="w-75" src={item.brandImg} alt={item.brandName} />
                  <p className="bodySmall mt-3">{item.brandName}</p>
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
