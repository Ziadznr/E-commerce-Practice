import React from 'react';
import ProductStore from '../../store/ProductStore';
import CategoriesSkeleton from '../../skeleton/categories-skeleton';
import { Link } from 'react-router-dom';

const Categories = () => {
  const { CategoryList } = ProductStore();
  const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5020';

  if (!CategoryList?.length) return <CategoriesSkeleton />;

  const getImageUrl = (imgPath) => {
    if (!imgPath) return 'https://via.placeholder.com/150?text=No+Image';

    // If already full URL
    if (imgPath.startsWith('http')) return imgPath;

    // Clean path (remove leading/trailing slashes and duplicate uploads/)
    const cleanPath = imgPath
      .replace(/^\/+/, '')
      .replace(/^uploads\//, '')
      .replace(/\/+$/, '');

    return `${baseURL}/uploads/${cleanPath}`;
  };

  return (
    <div className="section">
      <div className="container">
        <h2 className="text-center my-4">Top Categories</h2>
        
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
          {CategoryList.map((item) => {
            const imageURL = getImageUrl(item.categoryImg);
            console.log(`Image Debug: ${item.categoryName}`, {
              original: item.categoryImg,
              resolved: imageURL
            });

            return (
              <div key={item._id} className="col text-center">
                <Link 
                  to={`/by-category/${item._id}`} 
                  className="card h-100 border-0 shadow-sm rounded-3 text-center"
                >
                  <div className="card-body d-flex flex-column align-items-center">
                    <img
                      alt={item.categoryName}
                      className="img-fluid w-75"
                      src={imageURL}
                      onError={(e) => {
                        console.error('Image load failed:', {
                          item: item.categoryName,
                          attemptedURL: imageURL,
                          baseURL: baseURL,
                          env: import.meta.env.MODE
                        });
                        e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                      }}
                    />
                    <p className="mt-3 mb-0 small">{item.categoryName}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;