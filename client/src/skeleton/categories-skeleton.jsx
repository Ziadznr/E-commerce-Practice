import React from 'react';
import Lottie from 'lottie-react';
import Skeleton from 'react-loading-skeleton';
import animationData from '../assets/img/image.json'

const CategoriesSkeleton = () => {
    return (
        <div className=' section'>
            <div className='container'>
                <div className='row'>
                    <h1 className=' headline-6 text-center my-2 p-0'>Top Categories</h1>
                    <span className=' bodySmall mb-5 text-center'>Explore a World of Across Our Most Popular <br />Shopping Categories</span>
                    {
                        Array.from({length:12}).map(()=>{
                         return(
                            <div className='col-6 col-lg-1 text-center col-md-2 p-2'>
                            <div className='card h-100 rounded-3 bg-light'>
                                <div className=' card-body'>
                                    <Lottie className=' w-100' animationData={animationData} loop={true}/>
                                    <Skeleton count={1}/>
                                </div>
                            </div>
                        </div>
                         )
                        })
                    }
                </div>
            </div>
            
        </div>
    );
};

export default CategoriesSkeleton;