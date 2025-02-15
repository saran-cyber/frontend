import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Import the configured axios instance

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/auth/login', { email, password }); // Use api instance
      localStorage.setItem('token', res.data.token);
      alert('Logged in successfully.');
      navigate('/business-profile');
    } catch (err) {
      console.error('Login failed:', err.response?.data || err);
      alert(`Login failed: ${err.response?.data?.message || 'Unknown error'}`);
    }
  };

  return (
    <div className="container">
      <h2>Business Login</h2>
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
