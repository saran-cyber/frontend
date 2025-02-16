// frontend/src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_BACKEND_URL || "https://backend-2-5m08.onrender.com";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { email, password };
    console.log('Login payload:', payload);

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('Login response:', response.data);
      localStorage.setItem('token', response.data.token); // Store token in localStorage
      alert('Login successful!');
      navigate('/business-profile'); // Redirect to Business Profile after login
    } catch (err) {
      console.error('Login failed:', err.response ? err.response.data : err);
      alert(`Login failed: ${err.response?.data?.message || 'Unknown error'}`);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
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
        <button type="submit" className="button">Login</button>
      </form>
    </div>
  );
};

export default Login;
