import React from 'react';
import SubmitButton from './UserSubmitButton';
import UserStore from '../../store/UserStore';
import ValidationHelper from '../../utility/ValidationHelper';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const OtpForm = () => {
  let navigate = useNavigate();
  let { OTPFormOnChange, OTPFormData, VerifyOTPRequest } = UserStore();

  const onFormSubmit = async () => {
    if (ValidationHelper.IsEmpty(OTPFormData.otp)) {
      toast.error("Valid PIN Required");
    } else {
      let res = await VerifyOTPRequest(OTPFormData.otp);
      res ? navigate('/') : toast.error("Something Went Wrong");
    }
  };

  return (
    <div className="container section">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-7 col-lg-5">
          <div className="card p-4 p-md-5 shadow-sm">
            <h4 className="mb-3 text-center">Enter Verification Code</h4>
            <p className="mb-4 text-center">
              A verification code has been sent to the email address you provide
            </p>
            <input
              value={OTPFormData.otp}
              onChange={(e) => OTPFormOnChange('otp', e.target.value)}
              type="text"
              placeholder="Verification"
              className="form-control"
            />
            <SubmitButton
              onClick={onFormSubmit}
              submit={false}
              className="btn mt-4 btn-success w-100"
              text="Submit"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpForm;
