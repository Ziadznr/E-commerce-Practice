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
      {/* top bar */}
      <div className="container-fluid text-white p-2 bg-success">
        {/* ... same as before ... */}
      </div>

      {/* navbar */}
      <nav className="navbar sticky-top bg-white navbar-expand-lg navbar-light py-3">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img className="img-fluid" src={logo} alt="" width="96px" />
          </Link>

          {/* toggler button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#nav06"
            aria-controls="nav06"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="nav06">
            <ul className="navbar-nav mt-3 mt-lg-0 ms-lg-3">
              <li className="nav-item me-4">
                <Link className="nav-link" to="/">Home</Link>
              </li>
            </ul>

            {/* search */}
            <div className="d-lg-flex ms-auto input-group">
              <input
                value={SearchKeyword}
                onChange={(e) => SetSearchKeyword(e.target.value)}
                className="form-control"
                type="search"
                placeholder="Search"
              />
              <button onClick={handleSearch} className="btn btn-outline-dark" type="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style={{ width: 24, height: 24 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>

            {/* other links */}
            <Link to="/cart" className="btn ms-2 btn-light position-relative">
              <i className="bi text-dark bi-bag"></i>
            </Link>
            <Link to="/wish" className="btn ms-2 btn-light d-flex">
              <i className="bi text-dark bi-heart"></i>
            </Link>
            <Link to="/profile" className="btn ms-3 btn-success d-flex">
              Profile
            </Link>
            <Link to="/logout" className="btn ms-3 btn-success d-flex">
              Logout
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AppNavBar;
