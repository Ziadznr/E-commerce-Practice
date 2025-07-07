import React from 'react';
import SubmitButton from './UserSubmitButton';
import UserStore from '../../store/UserStore';
import ValidationHelper from '../../utility/ValidationHelper';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const OtpForm = () => {
  const { t } = useTranslation();
  let navigate = useNavigate();
  let { OTPFormOnChange, OTPFormData, VerifyOTPRequest } = UserStore();

  const onFormSubmit = async () => {
    if (ValidationHelper.IsEmpty(OTPFormData.otp)) {
      toast.error(t('valid_pin_required'));
    } else {
      let res = await VerifyOTPRequest(OTPFormData.otp);
      res ? navigate('/') : toast.error(t('something_went_wrong'));
    }
  };

  return (
    <div className="container section">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-7 col-lg-5">
          <div className="card p-4 p-md-5 shadow-sm">
            <h4 className="mb-3 text-center">{t('enter_verification_code')}</h4>
            <p className="mb-4 text-center">
              {t('verification_code_sent_info')}
            </p>
            <input
              value={OTPFormData.otp}
              onChange={(e) => OTPFormOnChange('otp', e.target.value)}
              type="text"
              placeholder={t('verification')}
              className="form-control"
            />
            <SubmitButton
              onClick={onFormSubmit}
              submit={false}
              className="btn mt-4 btn-success w-100"
              text={t('submit')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpForm;
