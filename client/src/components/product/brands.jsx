import React from 'react';
import ProductStore from '../../store/ProductStore';
import BrandsSkeleton from '../../skeleton/brands-skeleton';
import { Link } from 'react-router-dom';

const Brands = () => {
  const { BrandList } = ProductStore();
  const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5020';

  if (!BrandList?.length) return <BrandsSkeleton />;

  const getImageUrl = (imgPath) => {
    if (!imgPath) return 'https://via.placeholder.com/150?text=No+Image';

    // ✅ Handle base64 images
    if (imgPath.startsWith('data:image')) {
      return imgPath;
    }
    if (/^[A-Za-z0-9+/=]+$/.test(imgPath)) {
      // Looks like raw base64 (without "data:image/...;base64,")
      return `data:image/png;base64,${imgPath}`;
    }

    // ✅ If it's already a full URL
    if (imgPath.startsWith('http')) return imgPath;

    // ✅ Otherwise, treat it as a relative path from backend
    const cleanPath = imgPath.replace(/^\/+/, '');
    return `${baseURL}/${cleanPath}`;
  };

  return (
    <div className="section">
      <div className="container">
        <h2 className="text-center my-4">Top Brands</h2>
        <p className="text-center mb-5 small">
          Explore a World of Choices Across Our Most Popular <br />
          Shopping Categories
        </p>

        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
          {BrandList.map((item) => {
            const imageURL = getImageUrl(item.brandImg);

            return (
              <div key={item._id} className="col text-center">
                <Link
                  to={`/by-brand/${item._id}`}
                  className="card h-100 border-0 shadow-sm rounded-4 text-center"
                >
                  <div className="card-body d-flex flex-column align-items-center">
                    <img
                      alt={item.brandName}
                      className="img-fluid w-75"
                      src={imageURL}
                      loading="lazy"
                      onError={(e) => {
                        console.error('Brand image load failed:', {
                          brand: item.brandName,
                          attemptedURL: imageURL,
                          baseURL,
                        });
                        e.target.src =
                          'https://via.placeholder.com/150?text=No+Image';
                      }}
                    />
                    <p className="mt-3 mb-0 small">{item.brandName}</p>
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

export default Brands;
