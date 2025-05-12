import React from 'react';
import Skeleton from 'react-loading-skeleton'; // Make sure Skeleton is imported
import 'react-loading-skeleton/dist/skeleton.css'; // Include styles if using react-loading-skeleton

const LegalContentSkeleton = () => {
    return (
        <div className='container mt-3'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='card p-2'>
                        {Array.from({ length: 15 }).map((_, index) => (
                            <div key={index} className='mb-3'>
                                <Skeleton count={3} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LegalContentSkeleton;
