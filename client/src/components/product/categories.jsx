import React, { useEffect } from 'react';
import ProductStore from '../../store/ProductStore';
import CategoriesSkeleton from '../../skeleton/categories-skeleton';
import { Link } from 'react-router-dom';

const Categories = () => {
  const { CategoryList } = ProductStore();

  useEffect(() => {
    console.log(CategoryList); // Debug
  }, [CategoryList]);

  if (!CategoryList || CategoryList.length === 0) {
    return <CategoriesSkeleton />;
  }

  return (
    <div className="section">
      <div className="container">
        <div className="row">
          <h1 className="headline-4 text-center my-2 p-0">Top Categories</h1>
          <span className="bodySmall mb-5 text-center">
            Explore a World of Choices Across Our Most Popular <br />
            Shopping Categories
          </span>

          {CategoryList.map((item, i) => (
            <div key={i} className="col-lg-3 col-md-4 col-sm-6 p-2">
              <Link to={`/by-category/${item._id}`} className="card h-100 rounded-3 bg-white text-center">
                <div className="card-body">
                  <img alt={item.categoryName} className="w-75" src={item.categoryImg} />
                  <p className="bodySmall mt-3">{item.categoryName}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
