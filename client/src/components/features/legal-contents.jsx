import React from 'react';
import FeatureStore from '../../store/FeatureStore';
import LegalContentSkeleton from './../../skeleton/legal-content-skeleton';
import parse from 'html-react-parser';

const LegalContents = () => {
  const { LegalDetails } = FeatureStore();

  if (LegalDetails === null) {
    return <LegalContentSkeleton />;
  } else {
    return (
      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-11 col-md-10 col-lg-8">
            <div className="card p-3 p-sm-4 shadow-sm">
              <div className="legal-content">{parse(LegalDetails[0]['description'])}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default LegalContents;
