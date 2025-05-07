import React, { useEffect } from 'react';
import ProductStore from '../../store/ProductStore';
import SliderSkeleton from '../../skeleton/slider-skeleton';
import { Link } from 'react-router-dom';

const Slider = () => {
  const { SliderList } = ProductStore();

  useEffect(() => {
    console.log(SliderList);  // Debugging log
  }, [SliderList]);

  // Handle case when SliderList is null or empty
  if (!SliderList || SliderList.length === 0) {
    return <SliderSkeleton />;
  }

  return (
    <div>
      <div id="carouselExampleDark" className="carousel carousel-dark slide">
        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          {SliderList.map((_, i) => (
            <button
              key={`indicator-${i}`}
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to={i}
              className={i === 0 ? 'active' : ''}
              aria-current={i === 0 ? 'true' : undefined}
              aria-label={`Slide ${i + 1}`}
            ></button>
          ))}
        </div>

        {/* Carousel Items */}
        <div className="carousel-inner py-5">
          {SliderList.map((item, i) => (
            <div
              key={`slide-${i}`}
              className={`carousel-item${i === 0 ? ' active' : ''}`}
              data-bs-interval="10000"
            >
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12 col-lg-5 col-sm-12 col-md-5 p-5">
                    <h1 className="headline-1">{item.title}</h1>
                    <p>{item.des}</p>
                    <Link to={item.link || '#'} className="btn text-white btn-success px-5">
                      Buy Now
                    </Link>
                  </div>
                  <div className="col-12 col-lg-5 col-sm-12 col-md-5 p-5">
                    <img src={item.img} alt={item.title} className="w-100" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev btn rounded-5"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next btn"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Slider;
