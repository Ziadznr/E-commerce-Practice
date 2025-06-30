import React from 'react';
import FeatureStore from '../../store/FeatureStore';
import FeaturesSkeleton from '../../skeleton/features-skeleton';

const Features = () => {
  const { FeaturesList } = FeatureStore();
  const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5020';

  if (!FeaturesList?.length) return <FeaturesSkeleton />;

  const getImageUrl = (imgPath) => {
    if (!imgPath) return 'https://via.placeholder.com/100?text=No+Image';

    if (imgPath.startsWith('http')) return imgPath;

    const cleanPath = imgPath
      .replace(/^\/+/, '')
      .replace(/^uploads\//, '')
      .replace(/\/+$/, '');

    return `${baseURL}/uploads/${cleanPath}`;
  };

  return (
    <div className="container section">
      <div className="row">
        {FeaturesList.map((item, i) => {
          const imageURL = getImageUrl(item.img);
          console.log(`Feature Image Debug: ${item.name}`, {
            original: item.img,
            resolved: imageURL,
          });

          return (
            <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-3 p-2">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex flex-column flex-sm-row align-items-start">
                    <img
                      className="me-3 mb-2 mb-sm-0"
                      src={imageURL}
                      alt={item.name || 'Feature icon'}
                      style={{ width: '100px', height: '100px', objectFit: 'contain' }}
                      onError={(e) => {
                        console.error('Feature image load failed:', {
                          feature: item.name,
                          attemptedURL: imageURL,
                        });
                        e.target.src = 'https://via.placeholder.com/100?text=No+Image';
                      }}
                    />
                    <div>
                      <h3 className="h6 mb-1">{item.name}</h3>
                      <span className="text-muted small">{item.description}</span>
                    </div>
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

export default Features;
