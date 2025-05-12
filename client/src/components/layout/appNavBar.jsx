import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/img/z.jpg';
import ProductStore from '../../store/ProductStore';

const AppNavBar = () => {
  const navigate = useNavigate();
  const { SetSearchKeyword, SearchKeyword } = ProductStore();

  const handleSearch = () => {
    if (SearchKeyword?.length > 0) {
      navigate(`/by-keyword/${SearchKeyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <>
    <div className='container-fluid text-white p-2 bg-success'>
        <div className='container'>
            <div className=' row justify-content-around'>
                <div className=' col-md-5'>
                 <span>
                   <span className='f-12'>
                    <i className=' bi bi-envelope'></i> ziadznr311@gmail.com
                  </span>
                  <span className='f-12 mx-2'>
                    <i className=' bi bi-envelope'></i> 01704667725
                  </span>
                 </span>
    </div>
    <div className=' col-md-6'>
      <span className=' float-end'>
        <span className=' bodySmal mx-2'>
          <i className=' bi bi-bi-whatsapp'></i>
        </span>
        <span className=' bodySmal mx-2'>
          <i className=' bi bi-bi-facebook'></i>
        </span>
        <span className=' bodySmal'>
          <i className=' bi bi-bi-youtube'></i>
        </span>
      </span>
    </div>
    </div>
    </div>
    </div>

    <nav className=' navbar sticky-top bg-white navbar-expand-lg navbar-light py-3'>
      <div className=' container'>
        <Link className=' navbar-brand' to='/'>
        <img className=' img-fluid' src={logo} alt="" width='96px' />
        </Link>
        <button className=' navbar-toggler' type='button' data-bs-toggle=' collapse' data-bs-target="#nav06" aria-controls='nav06'>
          <span className=' navbar-toggler-icon'></span>
        </button>
        <div className=' collapse navbar-collapse' id=' nav06'>
          <ul className=' navbar-nav mt-3 mt-lg-8 mb-3 mb-lg-8 ms-lg-3'>
            <span className=' nav-item me-4'>
              <Link className=' nav-link' to='/'>Home</Link>
            </span>
          </ul>
        </div>
        <div className=' d-lg-flex'>
          <div className=' input-group'>
            <input onChange={(e)=>{SetSearchKeyword(e.target.value)}} className=' form-control' placeholder=' Search Here' type="search" />
            
          </div>
        </div>
      </div>
    </nav>
    </>
  );
};

export default AppNavBar;
