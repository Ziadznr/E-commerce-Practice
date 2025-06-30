import React from 'react';
import ProductStore from '../../store/ProductStore';
import SliderSkeleton from '../../skeleton/slider-skeleton';
import { Link } from 'react-router-dom';

const Slider = () => {
  const { SliderList } = ProductStore();
  const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5020';

  if (!SliderList?.length) return <SliderSkeleton />;

  const getImageUrl = (imgPath) => {
    if (!imgPath) return 'https://via.placeholder.com/1500x500?text=No+Image';
    if (imgPath.startsWith('http')) return imgPath;

    const cleanPath = imgPath.replace(/^\/+/, '');
    return `${baseURL}/${cleanPath}`;
  };

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
        <div className="carousel-inner py-4 py-lg-5">
          {SliderList.map((item, i) => {
            const imageURL = getImageUrl(item.img);

            return (
              <div
                key={`slide-${i}`}
                className={`carousel-item${i === 0 ? ' active' : ''}`}
                data-bs-interval="10000"
              >
                <div className="container">
                  <div className="row justify-content-center align-items-center">
                    {/* Text */}
                    <div className="col-12 col-md-6 col-lg-5 p-3 p-lg-5 text-center text-lg-start">
                      <h1 className="headline-1">{item.title}</h1>
                      <p>{item.des}</p>
                      <Link
                        to={item.link || '#'}
                        className="btn btn-success px-4 px-lg-5 py-2 py-lg-3 text-white"
                      >
                        Buy Now
                      </Link>
                    </div>

                    {/* Image */}
                    <div className="col-12 col-md-6 col-lg-5 p-3 p-lg-5">
                      <img
                        src={imageURL}
                        alt={item.title}
                        className="img-fluid rounded"
                        style={{
                          maxHeight: '1000px',
                          maxWidth: '100%',
                          objectFit: 'contain',
                        }}
                        loading="lazy"
                        onError={(e) => {
                          console.error('Slider image load failed:', {
                            slide: item.title,
                            attemptedURL: imageURL,
                            baseURL: baseURL,
                          });
                          e.target.src = 'https://via.placeholder.com/1500x500?text=No+Image';
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev btn rounded-circle"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="prev"
          style={{ width: '40px', height: '40px' }}
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next btn rounded-circle"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="next"
          style={{ width: '40px', height: '40px' }}
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Slider;
