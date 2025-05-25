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

    if (ListByRemark.length === 0) {
      return <p className="text-center my-4">No products found.</p>;
    }

    return (
      <div className="row g-3">
        {ListByRemark.map((item) => {
          const price = item.discount ? (
            <p className="bodyMedium text-dark mb-1">
              Price: <strike>${item.price}</strike> ${item.discountPrice}
            </p>
          ) : (
            <p className="bodyMedium text-dark mb-1">Price: ${item.price}</p>
          );

          return (
            <div
              key={item._id}
              className="col-12 col-sm-6 col-md-4 col-lg-3"
            >
              <Link
                to={`/details/${item._id}`}
                className="card shadow-sm h-100 border-0 rounded-4 bg-white text-decoration-none"
              >
                <img
                  className="w-100 rounded-top-4"
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
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
        })}
      </div>
    );
  };

  return (
    <section className="section">
      <div className="container-fluid text-center my-5 py-5 bg-light">
        <div className="row">
          <h1 className="headline-4 mb-2">Our Products</h1>
          <span className="bodySmal mb-4 d-block">
            Explore a World of Choices Across Our Most Popular
          </span>
          <div className="col-12">
            <ul
              className="nav nav-pills justify-content-center mb-4 gap-2"
              id="pills-tab"
              role="tablist"
            >
              {tabs.map((tabName) => (
                <li className="nav-item" key={tabName} role="presentation">
                  <button
                    onClick={() => setActiveTab(tabName)}
                    className={`nav-link ${activeTab === tabName ? 'active' : ''}`}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === tabName}
                    aria-controls={`tab-${tabName}`}
                    id={`tab-${tabName}-tab`}
                    tabIndex={activeTab === tabName ? 0 : -1}
                  >
                    {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
                  </button>
                </li>
              ))}
            </ul>

            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                role="tabpanel"
                aria-labelledby={`tab-${activeTab}-tab`}
                id={`tab-${activeTab}`}
              >
                <div className="container">{renderProductCards()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
