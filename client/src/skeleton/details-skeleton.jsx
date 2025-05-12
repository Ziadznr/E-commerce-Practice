import React from 'react';
import Lottie from 'lottie-react';
import Skeleton from 'react-loading-skeleton';
import animationData from '../assets/img/image.json'

const DetailsSkeleton = () => {
    return (
        <div className=' container mt-2'>
            <div className=' container'>
                <div className=' row'>
                    <div className=' col-md-7 align-content-center p-1'>
                        <div className=' container'>
                            <div className=' row'>
                                <div className=' col-12'>
                                    {
                                        // Add key prop to each skeleton in this map
                                        Array.from({length: 10}).map((_, index) => {
                                            return (
                                                <Skeleton key={index} count={1}/>  // Added key prop here
                                            );
                                        })
                                    }
                                </div>
                                <div className=' col-3'>
                                    <Lottie className=' w-100' animationData={animationData} loop={true}/>
                                </div>
                                <div className=' col-3'>
                                    <Lottie className=' w-100' animationData={animationData} loop={true}/>
                                </div>
                                <div className=' col-3'>
                                    <Lottie className=' w-100' animationData={animationData} loop={true}/>
                                </div>
                                <div className=' col-3'>
                                    <Lottie className=' w-100' animationData={animationData} loop={true}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=' col-md-5 p-1'>
                                    {
                                        // Add key prop to each skeleton in this map as well
                                        Array.from({length: 16}).map((_, index) => {
                                            return (
                                                <Skeleton key={index} count={1}/>  // Added key prop here as well
                                            );
                                        })
                                    }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsSkeleton;
