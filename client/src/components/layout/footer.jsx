import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/payment.png';

const Footer = () => {
  return (
    <div className="section-bottom shadow-sm bg-white mt-5">
      <div className="container py-5">
        <div className="row row-cols-1 row-cols-md-3 g-4 text-center text-md-start">
          {/* Column 1 - Legals */}
          <div>
            <h5 className="mb-3">Legals</h5>
            <p><Link className="nav-link p-0" to="/about">About</Link></p>
            <p><Link className="nav-link p-0" to="/refund">Refund Policy</Link></p>
            <p><Link className="nav-link p-0" to="/privacy">Privacy Policy</Link></p>
            <p><Link className="nav-link p-0" to="/terms">Terms</Link></p>
          </div>

          {/* Column 2 - Information */}
          <div>
            <h5 className="mb-3">Information</h5>
            <p><Link className="nav-link p-0" to="/how-to-buy">How to buy</Link></p>
            <p><Link className="nav-link p-0" to="/contact">Contact</Link></p>
            <p><Link className="nav-link p-0" to="/complain">Complain</Link></p>
          </div>

          {/* Column 3 - About */}
          <div>
            <h5 className="mb-3">About</h5>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
            <img
              className="img-fluid w-75 mt-3"
              src={logo}
              alt="Payment Methods"
            />
          </div>
        </div>
      </div>

      <div className="bg-dark py-3">
        <div className="container text-center">
          <p className="text-white mb-0 small">All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
