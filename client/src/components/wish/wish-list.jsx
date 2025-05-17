import React from 'react';
import WishStore from '../../store/WishStore';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import NoData from '../layout/no-data.jsx'
import ProductsSkeleton from '../../skeleton/products-skeleton';

const WishList = () => {

    const {WishListRequest,WishList,RemoveWishListRequest}=WishStore();

     useEffect(()=>{
        (async()=>{
         await WishListRequest();
        })()
      },[]);

      const remove=async(productId)=>{
        await RemoveWishListRequest(productId)
        await WishListRequest();
      }

      if(WishList===null){
         return (
        <div className=' container'>
            <div className=' row'>
                <ProductsSkeleton/>
            </div>
        </div>
    );
      }
      else if(WishList.length===0){
        return (
            <NoData/>
        )
      }
      else{
        return (
            <div className=' container mt-3'>
                <div className=' row'>
                    {
                        WishList.map((item,i)=>{
                            let price=<p className=' bodyMedium text-dark my-1'>Price: ${item['product']['price']}</p>
                            if(item['product']['discount']===true){
                                price=<p className='bodyMedium text-dark my-1'>Price: <strike>${item['product']['price']}</strike> ${item['product']['discount']}</p>
                            }
                            return(
                                <div key={i} className=' col=md-3 p-2 col-lg-3 col-sm-6 col-12'>
                                    <div className=' card shadow-sm h-100 rounded-3 bg-white'>
                                        <img className=' w-100 rounded-top-2' src={item['product']['image']} alt="" />
                                        <div className=' card-body'>
                                            <p className=' bodySmal text-secondary my-1'>{item['product']['title']}</p>
                                            {price}
                                            <StarRatings rating={parseFloat(item['product']['star'])} starRatedColor='red' starDimension='15px'/>

                                            <p className=' mt-3'>
                                                <button onClick={async()=>{await remove(item['productId'])}} className=' btn btn-outline-danger'>Remove</button>
                                                <Link className=' btn mx-2  btn-outline-success btn-sm' to={`/details/${item['productId']}`}>Details</Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
      }
   
};

export default WishList;