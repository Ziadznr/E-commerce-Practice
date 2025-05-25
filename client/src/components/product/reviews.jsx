import React from 'react';
import ProductStore from '../../store/ProductStore';
import StarRatings from 'react-star-ratings';

const Reviews = () => {
    const {ReviewList}=ProductStore()
    return (
        <div className="container my-4">
            <ul className="list-group mt-4 list-group-flush">
                {
                   ReviewList!==null? (ReviewList.map((item,i)=>{
                      return  <li key={i} className="list-group-item bg-transparent border-bottom">
                        <h6 className='mb-1 d-flex align-items-center gap-2'><i className="bi bi-person"></i> item['profile']['cus_name']</h6>
                        <StarRatings rating={parseFloat(item['rating'])} starRatedColor="gold" numberOfStars={5} starDimension="20px" starSpacing="3px" />
                        <p className="mt-2 mb-0 text-wrap"> item['des']</p>
                      </li>
                    })):(<span></span>)
                }
                

            </ul>
        </div>
    );
};

export default Reviews;