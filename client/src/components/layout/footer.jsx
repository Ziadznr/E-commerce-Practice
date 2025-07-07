import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/img/payment.png';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="section-bottom shadow-sm bg-white mt-5">
      <div className="container py-5">
        <div className="row row-cols-1 row-cols-md-3 g-4 text-center text-md-start">
          {/* Column 1 - Legals */}
          <div>
            <h5 className="mb-3">{t('legals')}</h5>
            <p><Link className="nav-link p-0" to="/about">{t('about')}</Link></p>
            <p><Link className="nav-link p-0" to="/refund">{t('refund_policy')}</Link></p>
            <p><Link className="nav-link p-0" to="/privacy">{t('privacy_policy')}</Link></p>
            <p><Link className="nav-link p-0" to="/terms">{t('terms')}</Link></p>
          </div>

          {/* Column 2 - Information */}
          <div>
            <h5 className="mb-3">{t('information')}</h5>
            <p><Link className="nav-link p-0" to="/how-to-buy">{t('how_to_buy')}</Link></p>
            <p><Link className="nav-link p-0" to="/contact">{t('contact')}</Link></p>
            <p><Link className="nav-link p-0" to="/complain">{t('complain')}</Link></p>
          </div>

          {/* Column 3 - About */}
          <div>
            <h5 className="mb-3">{t('about')}</h5>
            <p>{t('about_text')}</p>
            <img
              className="img-fluid w-75 mt-3"
              src={logo}
              alt={t('payment_methods_alt')}
            />
          </div>
        </div>
      </div>

      <div className="bg-dark py-3">
        <div className="container text-center">
          <p className="text-white mb-0 small">{t('all_rights_reserved')}</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
