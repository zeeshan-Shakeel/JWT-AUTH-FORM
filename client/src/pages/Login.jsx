import React, { useState } from 'react';
import { handleError, handleSuccess } from '../toastify';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginForm;

    if (!email || !password) {
      return handleError("Email or password required");
    }

    try {
      const response = await axios.post('http://localhost:4000/api/login', {
        email,
        password
      });

      const { success, message, user, token } = response.data;

      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", token);
        localStorage.setItem("loggedInUser", user.name);
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (err) {
      const detail = err?.response?.data?.message || "Something Went Wrong";
      handleError(detail);
      console.error(err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Login to Your Account</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={loginForm.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={loginForm.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>

          <p className="mt-3 text-center">
            Don't have an account? <Link to="/signUp" className="text-decoration-none">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
