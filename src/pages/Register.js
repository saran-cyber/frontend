// frontend/src/pages/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Use the backend URL from the environment variable
const API_URL = process.env.REACT_APP_BACKEND_URL || "https://backend-2-5m08.onrender.com";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { email, password };
    console.log('Register payload:', payload);

    try {
      const response = await axios.post(`${API_URL}/api/businesses`, payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('Registration response:', response.data);
      alert('Account registered successfully. Please login.');
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err.response ? err.response.data : err);
      alert(`Registration failed: ${err.response?.data?.message || 'Unknown error'}`);
    }
  };

  return (
    <div className="container">
      <h2>Register Your Business Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        <button type="submit" className="button">Register</button>
      </form>
    </div>
  );
};

export default Register;
