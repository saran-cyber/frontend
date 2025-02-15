import React, { useState } from 'react';
import api from '../api'; // Use the API instance
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { email, password };
    console.log('Register payload:', payload);
    try {
      const response = await api.post('/api/businesses', payload);
      console.log('Registration response:', response.data);
      alert('Account registered successfully. Please login.');
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err.response?.data || err);
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
