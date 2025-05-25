import React from 'react';
import SubmitButton from './UserSubmitButton';
import UserStore from '../../store/UserStore';
import ValidationHelper from './../../utility/ValidationHelper';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  let navigate = useNavigate();
  let { LoginFormOnChange, LoginFormData, UserOTPRequest } = UserStore();

  const onFormSubmit = async () => {
    if (!ValidationHelper.IsEmail(LoginFormData.email)) {
      toast.error("Valid Email Address Required");
    } else {
      let res = await UserOTPRequest(LoginFormData.email);
      res ? navigate('/otp') : toast.error("Something Went Wrong");
    }
  };

  return (
    <div className="container section">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-7 col-lg-5">
          <div className="card p-4 p-md-5 shadow-sm">
            <h4 className="mb-3 text-center">Enter Your Email</h4>
            <p className="mb-4 text-center">
              A verification code will be sent to the email address you provide
            </p>
            <input
              value={LoginFormData.email}
              onChange={(e) => LoginFormOnChange('email', e.target.value)}
              type="email"
              placeholder="Email Address"
              className="form-control"
            />
            <SubmitButton
              onClick={onFormSubmit}
              submit={false}
              className="btn mt-4 btn-success w-100"
              text="Next"
            />
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default LoginForm;
