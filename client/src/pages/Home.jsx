import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../toastify';

const Home = () => {
  const product = [
    { name: "Zeeshan", Price: 2300, Quality: "High-Level" },
    { name: "Huzaifa", Price: 2500, Quality: "Premium" },
    { name: "Moazam", Price: 3333, Quality: "Good" }
  ];

  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState('');

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess("User Logged Out");
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Welcome, <span className="text-primary">{loggedInUser}</span></h4>
        <button className="btn btn-danger btn-sm" onClick={handleLogOut}>Logout</button>
      </div>

      <div className="row">
        {product.map((item, index) => (
          <div key={index} className="col-md-4 mb-3">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text"><strong>Price:</strong> Rs. {item.Price}</p>
                <p className="card-text"><strong>Quality:</strong> {item.Quality}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
