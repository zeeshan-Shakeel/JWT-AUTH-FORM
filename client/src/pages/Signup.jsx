import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../toastify';

const Signup = () => {
  const navigate = useNavigate();
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupForm({ ...signupForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupForm;

    if (!name || !email || !password) {
      return handleError("Name, email and password are required");
    }

    try {
      const res = await axios.post("http://localhost:4000/api/signUp", {
        name,
        email,
        password,
      });

      const { success, message } = res.data;

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else {
        handleError(message || "SignUp Failed");
      }
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong";
      handleError(message);
      console.error(err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Create an Account</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="name"
              value={signupForm.name}
              onChange={handleChange}
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={signupForm.email}
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
              value={signupForm.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Sign Up</button>

          <p className="mt-3 text-center">
            Already have an account? <Link to="/login" className="text-decoration-none">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
