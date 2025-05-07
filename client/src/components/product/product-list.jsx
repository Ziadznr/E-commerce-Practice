import React, { useState } from 'react';
import ProductStore from '../../store/ProductStore';
import { Link } from 'react-router-dom';
import ProductsSkeleton from '../../skeleton/products-skeleton';
import StarRatings from 'react-star-ratings';
import { useEffect } from 'react';

const ProductList = () => {
  const { ListProduct,BrandListRequest,BrandList,CategoryListRequest,CategoryList,ListByFilterRequest } = ProductStore();
  let [Filter, SetFilter] = useState({
        brandId:"",
        categoryId:"",
        priceMax:"",
        priceMin:""
  });

  const inputOnChange= async (name,value)=>{
    SetFilter((data)=>({
        ...data,
        [name]:value,

    }));
  }
 

  useEffect(()=>{
    (async ()=>{
        BrandList===null?await BrandListRequest():null;
        CategoryList===null?await CategoryListRequest():null;

        let isEveryFilterPropertyEmpty= Object.values(Filter).every(value => value===0);
        !isEveryFilterPropertyEmpty?await ListByFilterRequest(Filter):null;
    })()
  },[Filter])


  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-md-3 p-2">
          <div className="card vh-100 p-3 shadow-sm">
            <label className="form-label mt-3">Brands</label>
            <select value={Filter.brandId} onChange={async(e)=>{await inputOnChange('brandId',e.target.value)}} className="form-control form-select">
              <option value="">Choose Brand</option>
              {BrandList!==null?(
                BrandList.map((item)=>{
                    return (<option value={item['_id']}>{item['brandName']}</option>)
                })

              ):<option> </option>}
            </select>

            <label className="form-label mt-3">Categories</label>
            <select value={Filter.categoryId} onChange={async(e)=>{await inputOnChange('categoryId',e.target.value)}} className="form-control form-select">
              <option value="">Choose Category</option>
              {CategoryList!==null?(
                CategoryList.map((item)=>{
                    return (<option value={item['_id']}>{item['categoryName']}</option>)
                })

              ):<option> </option>}
            </select>

            <label className="form-label mt-3">Maximum Price TK {Filter.priceMax}</label>
            <input value={Filter.priceMax} onChange={async(e)=>{await inputOnChange('priceMax',e.target.value)}} min={0} max={100000} step={1000} type="range" className="form-range" />

            <label className="form-label mt-3">Minimum Price Tk {Filter.priceMin}</label>
            <input value={Filter.priceMin} onChange={async(e)=>{await inputOnChange('priceMin',e.target.value)}} min={0} max={100000} step={1000} type="range" className="form-range" />
          </div>
        </div>

        <div className="col-md-9 p-2">
          <div className="row g-4">
            {
              ListProduct === null ? (<ProductsSkeleton />) : (
                ListProduct.map((item, i) => {
                  let price = <p className="bodyMedium text-dark mb-1">Price: ${item['price']}</p>;
                  if (item['discount'] === true) {
                    price = <p className="bodyMedium text-dark mb-1">Price: <strike>${item['price']}</strike> ${item['discountPrice']}</p>;
                  }
                  return (
                    <div className="col-md-3 col-sm-6 col-12" key={i}>
                      <Link to={`/details/${item['_id']}`} className="card shadow-sm h-100 border-0 rounded-4 bg-white text-decoration-none">
                        <img className="w-100 rounded-top-4" src={item['image']} alt="product" />
                        <div className="card-body">
                          <p className="bodySmal text-secondary mb-1">{item['title']}</p>
                          {price}
                          <StarRatings rating={parseFloat(item['star'])} starRatedColor="gold" numberOfStars={5} starDimension="20px" starSpacing="3px" />
                        </div>
                      </Link>
                    </div>
                  );
                })
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
