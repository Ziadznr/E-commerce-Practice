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
        if (res?.error) {
          toast.error(res.error);
        } else if (res?.message) {
          toast.success(res.message);
          setIsRegister(false);
        }
      } else {
        const res = await loginAdmin(email, password);
        if (res?.admin?.email) {
          toast.success('Login successful');
          navigate('/products');
        } else if (res?.error) {
          toast.error(res.error);
        } else {
          toast.error('Login failed. Invalid response.');
        }
      }
    } catch (error) {
      toast.error(error?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">

      {/* Header */}
      <header className="bg-dark text-white py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Admin Panel</h5>
          <button
            className="btn btn-sm btn-outline-light"
            onClick={() => navigate('/login')}
          >
            <i className="bi bi-arrow-left me-1"></i> Back to Login
          </button>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-grow-1 d-flex justify-content-center align-items-center py-5 bg-light">
        <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
          <h4 className="text-center mb-3">
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
            {isRegister
              ? 'Already have an account?'
              : "Don't have an account?"}{' '}
            <button
              type="button"
              className="btn btn-link p-0"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? 'Login here' : 'Register here'}
            </button>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-2 mt-auto">
        <small>&copy; {new Date().getFullYear()} Admin Dashboard. All rights reserved.</small>
      </footer>
    </div>
  );
};

export default LoginRegistrationList;
