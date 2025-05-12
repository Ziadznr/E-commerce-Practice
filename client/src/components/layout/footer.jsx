import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/payment.png';
const Footer = () => {
  return (
    <div className="section-bottom shadow-sm bg-white">
      <div className="container py-5">
        <div className="row">
          {/* Column 1 - Legals */}
          <div className="col-md-4">
            <h1 className="bodyMedium">Legals</h1>
            <p className="my-2">
              <Link className="nav-link" to="/about">About</Link>
            </p>
            <p className="my-2">
              <Link className="nav-link" to="/refund">Refund Policy</Link>
            </p>
             <p className="my-2">
              <Link className="nav-link" to="/privacy">Privacy Policy</Link>
            </p>
            <p className="my-2">
              <Link className="nav-link" to="/terms">Terms</Link>
            </p>
          </div>

          {/* Column 2 - Information */}
          <div className="col-md-4">
            <h1 className="bodyMedium">Information</h1>
            <p className="my-2">
              <Link className="nav-link" to="/how-to-buy">How to buy</Link>
            </p>
            <p className="my-2">
              <Link className="nav-link" to="/contact">Contact</Link>
            </p>
            <p className="my-2">
              <Link className="nav-link" to="/complain">Complain</Link>
            </p>
          </div>

          {/* Column 3 - About */}
          <div className="col-md-4">
            <h1 className="bodyMedium">About</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            </p>
            <img
              className="w-75"
              src={logo}
              alt="Payment Methods"
            />
          </div>
        </div>

        <div className="bg-dark mt-2 py-3 text-center">
          <p className="text-white bodySmall">All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
