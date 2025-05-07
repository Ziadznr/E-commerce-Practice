import React from 'react';
import ProductStore from '../../store/ProductStore';
import ProductsSkeleton from '../../skeleton/products-skeleton';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

const Products = () => {
    const {ListByRemark, ListByRemarkRequest}=ProductStore()
    
       return (
        <div className='section'>
        <div className="container-fluid text-center my-5 py-5 bg-light">
          <div className="row">
            <h1 className='headline-4 mb-2'>Our Products</h1>
            <span className="bodySmal mb-4">Explore a World of Choices Across Our Most Popular</span>
            <div className="col-12">
              <ul className="nav nav-pills justify-content-center mb-4 gap-2" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button onClick={()=>{ListByRemarkRequest('new')}} className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-new" type="button" role="tab" aria-selected="true">New</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button onClick={()=>{ListByRemarkRequest('trending')}} className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-trending" type="button" role="tab" aria-selected="false">Trending</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button onClick={()=>{ListByRemarkRequest('popular')}} className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-popular" type="button" role="tab" aria-selected="false">Popular</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button onClick={()=>{ListByRemarkRequest('top')}} className="nav-link" id="pills-disabled-tab" data-bs-toggle="pill" data-bs-target="#pills-top" type="button" role="tab" aria-selected="false">Top</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button onClick={()=>{ListByRemarkRequest('special')}} className="nav-link" id="pills-special-tab" data-bs-toggle="pill" data-bs-target="#pills-special" type="button" role="tab" aria-selected="false">Special</button>
                </li>
              </ul>
      
              <div className="tab-content" id="pills-tabContent">

                <div className="tab-pane fade show active" id="pills-new" role="tabpanel" aria-labelledby=' pills-home-tab' tabIndex={0}>

                    {
                        ListByRemark===null?(<ProductsSkeleton/>):(
                            <div className="container">
                            <div className="row g-4">
                              {
        
                                ListByRemark.map((item,i)=>{

                                    let price=<p className="bodyMedium text-dark mb-1">Price: ${item['price']}</p>
                                    if(item['discount']===true){
                                        price=<p className="bodyMedium text-dark mb-1">Price: <strike>${item['price']}</strike> ${item['discountPrice']} </p>

                                    }
                                    return (
                                        <div className="col-md-3 col-sm-6 col-12" key={i}>
                                        <Link to={`/details/${item['_id']}`} className="card shadow-sm h-100 border-0 rounded-4 bg-white text-decoration-none">
                                          <img className="w-100 rounded-top-4" src={item['image']} alt="product" />
                                          <div className="card-body">
                                            <p className="bodySmal text-secondary mb-1">{item['title']}</p>
                                            {price}
                                            <StarRatings  rating={parseFloat(item['star'])} starRatedColor="gold" numberOfStars={5} starDimension="20px" starSpacing="3px" />
                                          </div>
                                        </Link>
                                      </div>
                                    )
                                })
                              }
                            </div>
                          </div>
                        )
                    }
                 
                </div>
      
                <div className="tab-pane fade show active" id="pills-new" role="tabpanel" aria-labelledby=' pills-home-tab' tabIndex={0}>
                {
                        ListByRemark===null?(<ProductsSkeleton/>):(
                            <div className="container">
                            <div className="row g-4">
                              {
        
                                ListByRemark.map((item,i)=>{

                                    let price=<p className="bodyMedium text-dark mb-1">Price: ${item['price']}</p>
                                    if(item['discount']===true){
                                        price=<p className="bodyMedium text-dark mb-1">Price: <strike>${item['price']}</strike> ${item['discountPrice']} </p>

                                    }
                                    return (
                                        <div className="col-md-3 col-sm-6 col-12" key={i}>
                                        <Link to={`/details/${item['_id']}`} className="card shadow-sm h-100 border-0 rounded-4 bg-white text-decoration-none">
                                          <img className="w-100 rounded-top-4" src={item['image']} alt="product" />
                                          <div className="card-body">
                                            <p className="bodySmal text-secondary mb-1">{item['title']}</p>
                                            {price}
                                            <StarRatings  rating={parseFloat(item['star'])} starRatedColor="gold" numberOfStars={5} starDimension="20px" starSpacing="3px" />
                                          </div>
                                        </Link>
                                      </div>
                                    )
                                })
                              }
                            </div>
                          </div>
                        )
                    }
                </div>
      
                <div className="tab-pane fade show active" id="pills-new" role="tabpanel" aria-labelledby=' pills-home-tab' tabIndex={0}>
                {
                        ListByRemark===null?(<ProductsSkeleton/>):(
                            <div className="container">
                            <div className="row g-4">
                              {
        
                                ListByRemark.map((item,i)=>{

                                    let price=<p className="bodyMedium text-dark mb-1">Price: ${item['price']}</p>
                                    if(item['discount']===true){
                                        price=<p className="bodyMedium text-dark mb-1">Price: <strike>${item['price']}</strike> ${item['discountPrice']} </p>

                                    }
                                    return (
                                        <div className="col-md-3 col-sm-6 col-12" key={i}>
                                        <Link to={`/details/${item['_id']}`} className="card shadow-sm h-100 border-0 rounded-4 bg-white text-decoration-none">
                                          <img className="w-100 rounded-top-4" src={item['image']} alt="product" />
                                          <div className="card-body">
                                            <p className="bodySmal text-secondary mb-1">{item['title']}</p>
                                            {price}
                                            <StarRatings  rating={parseFloat(item['star'])} starRatedColor="gold" numberOfStars={5} starDimension="20px" starSpacing="3px" />
                                          </div>
                                        </Link>
                                      </div>
                                    )
                                })
                              }
                            </div>
                          </div>
                        )
                    }
                </div>

                 <div className="tab-pane fade show active" id="pills-new" role="tabpanel" aria-labelledby=' pills-home-tab' tabIndex={0}>

                    {
                        ListByRemark===null?(<ProductsSkeleton/>):(
                            <div className="container">
                            <div className="row g-4">
                              {
        
                                ListByRemark.map((item,i)=>{

                                    let price=<p className="bodyMedium text-dark mb-1">Price: ${item['price']}</p>
                                    if(item['discount']===true){
                                        price=<p className="bodyMedium text-dark mb-1">Price: <strike>${item['price']}</strike> ${item['discountPrice']} </p>

                                    }
                                    return (
                                        <div className="col-md-3 col-sm-6 col-12 " key={i}>
                                        <Link to={`/details/${item['_id']}`} className="card shadow-sm h-100 border-0 rounded-4 bg-white text-decoration-none">
                                          <img className="w-100 rounded-top-4" src={item['image']} alt="product" />
                                          <div className="card-body">
                                            <p className="bodySmal text-secondary mb-1">{item['title']}</p>
                                            {price}
                                            <StarRatings  rating={parseFloat(item['star'])} starRatedColor="gold" numberOfStars={5} starDimension="20px" starSpacing="3px" />
                                          </div>
                                        </Link>
                                      </div>
                                    )
                                })
                              }
                            </div>
                          </div>
                        )
                    }
                 
                </div>

                 <div className="tab-pane fade show active" id="pills-new" role="tabpanel" aria-labelledby=' pills-home-tab' tabIndex={0}>

                    {
                        ListByRemark===null?(<ProductsSkeleton/>):(
                            <div className="container">
                            <div className="row g-4">
                              {
        
                                ListByRemark.map((item,i)=>{

                                    let price=<p className="bodyMedium text-dark mb-1">Price: ${item['price']}</p>
                                    if(item['discount']===true){
                                        price=<p className="bodyMedium text-dark mb-1">Price: <strike>${item['price']}</strike> ${item['discountPrice']} </p>

                                    }
                                    return (
                                        <div className="col-md-3 col-sm-6 col-12" key={i}>
                                        <Link to={`/details/${item['_id']}`} className="card shadow-sm h-100 border-0 rounded-4 bg-white text-decoration-none">
                                          <img className="w-100 rounded-top-4" src={item['image']} alt="product" />
                                          <div className="card-body">
                                            <p className="bodySmal text-secondary mb-1">{item['title']}</p>
                                            {price}
                                            <StarRatings  rating={parseFloat(item['star'])} starRatedColor="gold" numberOfStars={5} starDimension="20px" starSpacing="3px" />
                                          </div>
                                        </Link>
                                      </div>
                                    )
                                })
                              }
                            </div>
                          </div>
                        )
                    }
                 
                </div>
      
              </div>
            </div>
          </div>
        </div>
      </div>
       )      
};

export default Products;