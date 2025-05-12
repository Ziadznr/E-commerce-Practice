import React, { useEffect, useState } from 'react';
import ProductStore from '../../store/ProductStore';
import ProductsSkeleton from '../../skeleton/products-skeleton';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

const tabs = ['new', 'trending', 'popular', 'top', 'special'];

const Products = () => {
  const { ListByRemark, ListByRemarkRequest } = ProductStore();
  const [activeTab, setActiveTab] = useState('new');

  useEffect(() => {
    ListByRemarkRequest(activeTab);
  }, [activeTab]);

  const renderProductCards = () => {
    if (ListByRemark === null) {
      return <ProductsSkeleton />;
    }

    return (
      <div className="container">
        <div className="row g-4">
          {ListByRemark.map((item, i) => {
            const price = item.discount ? (
              <p className="bodyMedium text-dark mb-1">
                Price: <strike>${item.price}</strike> ${item.discountPrice}
              </p>
            ) : (
              <p className="bodyMedium text-dark mb-1">Price: ${item.price}</p>
            );

            return (
              <div className="col-md-3 col-sm-6 col-12" key={i}>
                <Link
                  to={`/details/${item._id}`}
                  className="card shadow-sm h-100 border-0 rounded-4 bg-white text-decoration-none"
                >
                  <img className="w-100 rounded-top-4" src={item.image} alt="product" />
                  <div className="card-body">
                    <p className="bodySmal text-secondary mb-1">{item.title}</p>
                    {price}
                    <StarRatings
                      rating={parseFloat(item.star)}
                      starRatedColor="gold"
                      numberOfStars={5}
                      starDimension="20px"
                      starSpacing="3px"
                    />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="section">
      <div className="container-fluid text-center my-5 py-5 bg-light">
        <div className="row">
          <h1 className="headline-4 mb-2">Our Products</h1>
          <span className="bodySmal mb-4">Explore a World of Choices Across Our Most Popular</span>
          <div className="col-12">
            <ul className="nav nav-pills justify-content-center mb-4 gap-2" id="pills-tab" role="tablist">
              {tabs.map((tabName) => (
                <li className="nav-item" key={tabName} role="presentation">
                  <button
                    onClick={() => setActiveTab(tabName)}
                    className={`nav-link ${activeTab === tabName ? 'active' : ''}`}
                    type="button"
                    role="tab"
                  >
                    {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
                  </button>
                </li>
              ))}
            </ul>

            {/* Content */}
            <div className="tab-content" id="pills-tabContent">
              <div className="tab-pane fade show active" role="tabpanel">
                {renderProductCards()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
