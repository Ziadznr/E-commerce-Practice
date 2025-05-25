import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/img/z.jpg';
import ProductStore from '../../store/ProductStore';
import SubmitButton from '../user/UserSubmitButton';
import UserStore from './../../store/UserStore';
import CartStore from '../../store/CartStore';
import { useEffect } from 'react';
import WishStore from '../../store/WishStore';

const AppNavBar = () => {
  const navigate = useNavigate();
  const { SetSearchKeyword, SearchKeyword } = ProductStore();
  const { isLogin, UserLogoutRequest } = UserStore();
  const { CartCount, CartListRequest } = CartStore();
  const { WishCount, WishListRequest } = WishStore();

  const onLogout = async () => {
    await UserLogoutRequest();
    sessionStorage.clear();
    localStorage.clear();
    navigate('/login');
  };

  const handleSearch = () => {
    if (SearchKeyword?.length > 0) {
      navigate(`/by-keyword/${SearchKeyword}`);
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    (async () => {
      if (isLogin()) {
        await CartListRequest();
        await WishListRequest();
      }
    })();
  }, []);

  return (
    <>
      <div className="container-fluid text-white p-2 bg-success">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-12 col-md-auto text-center text-md-start mb-2 mb-md-0">
              <small>
                <i className="bi bi-envelope"></i> ziadznr311@gmail.com
              </small>
              <small className="ms-3">
                <i className="bi bi-telephone"></i> 01704667725
              </small>
            </div>
            <div className="col-auto text-center text-md-end">
              <span className="mx-2">
                <i className="bi bi-whatsapp"></i>
              </span>
              <span className="mx-2">
                <i className="bi bi-facebook"></i>
              </span>
              <span className="mx-2">
                <i className="bi bi-youtube"></i>
              </span>
            </div>
          </div>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top py-3">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Logo" className="img-fluid" width="96px" />
          </Link>

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

          <div className="collapse navbar-collapse mt-3 mt-lg-0" id="nav06">
            <ul className="navbar-nav me-auto">
              <li className="nav-item me-4">
                <Link className="nav-link h5" to="/">
                  <button type="button" className="btn btn-success">
  <i className="bi bi-house"></i> Home
</button>

                </Link>
              </li>
            </ul>

            <div className="d-flex flex-wrap align-items-center gap-2">
              {/* Search */}
              <div className="input-group">
                <input
                  value={SearchKeyword}
                  onChange={(e) => SetSearchKeyword(e.target.value)}
                  className="form-control"
                  placeholder="Search Here"
                  type="search"
                />
                <button onClick={handleSearch} className="btn btn-outline-dark">
                  <i className="bi bi-search"></i>
                </button>
              </div>

              {/* Cart */}
              <Link to="/cart" className=" m-2 btn btn-light position-relative">
                <i className="bi text-dark bi-bag"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                  {CartCount}
                  <span className="visually-hidden">unread messages</span>
                </span>
              </Link>

              {/* Wishlist */}
              <Link to="/wish" className=" m-2 btn btn-light position-relative">
                <i className="bi text-dark bi-heart"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                  {WishCount}
                  <span className="visually-hidden">unread messages</span>
                </span>
              </Link>

              {/* Auth Buttons */}
              {isLogin() ? (
                <>
                 <SubmitButton
  onClick={onLogout}
  text={
    <>
      <i className="bi bi-box-arrow-right me-2"></i> Logout
    </>
  }
  className="btn btn-success"
/>

                  <Link to="/profile" className="btn btn-success">
                    <i className="bi bi-person-circle"></i> Profile
                  </Link>
                  <Link to="/orders" className="btn btn-success">
                    
  <i className="bi bi-cart"></i> Place Order


                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-success">
                    <i class="bi bi-door-open"></i>Login
                  </Link>
                  <Link to="/adminlogin" className="btn btn-success">
                    <h6><i className="bi bi-person-gear me-1"></i> Admin Panel</h6>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AppNavBar;
