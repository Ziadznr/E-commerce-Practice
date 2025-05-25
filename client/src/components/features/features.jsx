import React from 'react';
import FeatureStore from '../../store/FeatureStore';
import FeaturesSkeleton from '../../skeleton/features-skeleton';

const Features = () => {
  const { FeaturesList } = FeatureStore();

  if (!FeaturesList || FeaturesList.length === 0) {
    return <FeaturesSkeleton />;
  } else {
    return (
      <div className="container section">
        <div className="row">
          {FeaturesList.map((item, i) => {
            return (
              <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-3 p-2">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex flex-column flex-sm-row align-items-start">
                      <img
                        className="me-3 mb-2 mb-sm-0"
                        src={item['img']}
                        alt="no img"
                         style={{ width: '100px', height: '100px', objectFit: 'contain' }}
                      />
                      <div>
                        <h3 className="h6 mb-1">{item['name']}</h3>
                        <span className="text-muted small">{item['description']}</span>
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
  }
};

export default Features;
