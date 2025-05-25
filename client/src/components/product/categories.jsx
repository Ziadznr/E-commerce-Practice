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
        <h2 className="text-center my-4">Top Categories</h2>
        <p className="text-center mb-5 small">
          Explore a World of Choices Across Our Most Popular <br />
          Shopping Categories
        </p>

        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
          {CategoryList.map((item, i) => (
            <div key={i} className="col text-center">
              <Link
                to={`/by-category/${item._id}`}
                className="card h-100 border-0 shadow-sm rounded-3 text-center"
              >
                <div className="card-body d-flex flex-column align-items-center">
                  <img
                    alt={item.categoryName}
                    className="img-fluid w-75"
                    src={item.categoryImg}
                  />
                  <p className="mt-3 mb-0 small">{item.categoryName}</p>
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
