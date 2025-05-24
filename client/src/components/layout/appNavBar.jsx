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
  const {CartCount,CartListRequest}=CartStore();
  const {WishCount,WishListRequest}=WishStore();

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

  useEffect(()=>{
    (async()=>{
      if(isLogin()){
        await CartListRequest();
        await WishListRequest();
      }
    })()
  },[]);

  return (
    <>
      <div className="container-fluid text-white p-2 bg-success">
        <div className="container">
          <div className=" row justify-content-around">
            <div className=" col-md-5">
              <span>
                <span className="f-12">
                  <i className=" bi bi-envelope"></i> ziadznr311@gmail.com
                </span>
                <span className="f-12 mx-2">
                  <i className=" bi bi-envelope"></i> 01704667725
                </span>
              </span>
            </div>
            <div className=" col-md-6">
              <span className=" float-end">
                <span className=" bodySmal mx-2">
                  <i className="bi bi-whatsapp"></i>
                </span>
                <span className=" bodySmal mx-2">
                  <i className="bi bi-facebook"></i>
                </span>
                <span className=" bodySmal mx-2">
                  <i className=" bi bi-youtube"></i>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <nav className=" navbar sticky-top bg-white navbar-expand-lg navbar-light py-3">
        <div className=" container">
          <Link className=" navbar-brand" to="/">
            <img className=" img-fluid" src={logo} alt="" width="96px" />
          </Link>
          <button
            className=" navbar-toggler"
            type="button"
            data-bs-toggle=" collapse"
            data-bs-target="#nav06"
            aria-controls="nav06"
          >
            <span className=" navbar-toggler-icon"></span>
          </button>
          <div className=" collapse navbar-collapse" id=" nav06">
            <ul className="navbar-nav mt-3 mt-lg-0 ms-lg-3">
              <li className="nav-item me-4">
                <Link className="nav-link" to="/">
                  <h4>Home</h4>
                </Link>
              </li>
            </ul>
          </div>
          <div className=" d-lg-flex">
            <div className=" input-group">
              <input
                value={SearchKeyword}
                onChange={(e) => {
                  SetSearchKeyword(e.target.value);
                }}
                className=" form-control"
                placeholder=" Search Here"
                type="search"
              />
              <button
                onClick={handleSearch}
                className="btn btn-outline-dark"
                type="button"
              >
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
            <Link
              to="/cart"
              type=" button"
              className=" btn ms-2 btn-light position-relative"
            >
              <i className="bi text-dark bi-bag"></i>
              <span className=' position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success'>
                {CartCount}
                <span className=' visually-hidden'>unread message</span>
              </span>
            </Link>
            <Link
              to="/wish"
              type=" button"
              className=" btn ms-4 btn-light position-relative"
            >
              <i className="bi text-dark bi-heart"></i>
               <span className=' position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning'>
                {WishCount}
                <span className=' visually-hidden'>unread message</span>
              </span>
            </Link>

            {isLogin() ? (
              <>
                <SubmitButton
                  onClick={onLogout}
                  text="Logout"
                  className=" btn ms-4 btn-success d-flex"
                />
                <Link
                  type=" button"
                  className=" btn ms-4 btn-success d-flex"
                  to="/profile"
                >
                  Profile
                </Link>
                <Link
                  type=" button"
                  className=" btn ms-4 btn-success d-flex"
                  to="/orders"
                >
                  Order
                </Link>
              </>
            ) : 
             (
  <>
    <Link type="button" className="btn ms-4 btn-success d-flex" to="/login">
      Login
    </Link>
    <Link type="button" className="btn ms-4 btn-success d-flex" to="/adminlogin">
      Admin
    </Link>
  </>
)}
          </div>
        </div>
      </nav>
    </>
  );
};

export default AppNavBar;
