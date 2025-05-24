import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAdminStore from '../../store/AdminStore';
import toast from 'react-hot-toast';

const LoginRegistrationList = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { loginAdmin, registerAdmin, loading } = useAdminStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Email and password are required');
      return;
    }

    try {
      if (isRegister) {
        const res = await registerAdmin(email, password);
        if (res && res.error) {
          toast.error(res.error);
        } else if (res && res.message) {
          toast.success(res.message);
          setIsRegister(false); // Switch to login after successful registration
        }
      } else {
        const res = await loginAdmin(email, password);
console.log('Login response:', res);

if (res && res.admin && res.admin.email) {
  toast.success('Login successful');
  navigate('/products');
} else if (res && res.error) {
  toast.error(res.error);
} else {
  toast.error('Login failed. Invalid response.');
}

      }
    } catch (error) {
  toast.error(error && error.message ? error.message : 'Something went wrong. Please try again.');
}

  };

  return (
    <div className="container section">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card p-4 shadow">
            <h4 className="mb-3 text-center">
              {isRegister ? 'Admin Registration' : 'Admin Login'}
            </h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-success w-100"
                disabled={loading}
              >
                {loading ? 'Please wait...' : isRegister ? 'Register' : 'Login'}
              </button>
            </form>

            <p className="text-center mt-3">
              {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                className="btn btn-link p-0"
                onClick={() => setIsRegister(!isRegister)}
              >
                {isRegister ? 'Login' : 'Register'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegistrationList;
