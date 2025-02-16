// frontend/src/pages/BusinessProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_BACKEND_URL || "https://backend-2-5m08.onrender.com";

const predefinedTypes = ['Hospital', 'Gym', 'Saloon', 'Spas', 'Car Wash'];

const BusinessProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    type: '',
    mobile: '',
    openTime: '',
    closeTime: '',
    specialists: []
  });
  const [newSpecialist, setNewSpecialist] = useState({ name: '', specialization: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/businesses/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(res.data);
      } catch (err) {
        console.error('Failed to fetch profile:', err.response?.data || err);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const addSpecialist = () => {
    if (newSpecialist.name && newSpecialist.specialization) {
      setProfile({
        ...profile,
        specialists: [...profile.specialists, newSpecialist]
      });
      setNewSpecialist({ name: '', specialization: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Unauthorized! Please log in again.");
      navigate('/login');
      return;
    }

    try {
      const res = await axios.put(`${API_URL}/api/businesses/${profile._id}`, profile, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      alert('Profile updated successfully.');
      setProfile(res.data);
    } catch (err) {
      console.error('Profile update failed:', err.response?.data || err);
      alert(`Profile update failed: ${err.response?.data?.message || 'Unknown error'}`);
    }
  };

  return (
    <div className="container">
      <h2>Business Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Business Name:</label>
          <input 
            type="text" 
            name="name"
            value={profile.name}
            onChange={handleChange}
            required 
          />
        </div>
        <div>
          <label>Business Type:</label>
          <select name="type" value={profile.type} onChange={handleChange} required>
            <option value="">Select Type</option>
            {predefinedTypes.map((typeOption, index) => (
              <option key={index} value={typeOption}>{typeOption}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Mobile:</label>
          <input 
            type="text" 
            name="mobile"
            value={profile.mobile}
            onChange={handleChange}
            required 
          />
        </div>
        <div>
          <label>Open Time:</label>
          <input 
            type="time" 
            name="openTime"
            value={profile.openTime}
            onChange={handleChange}
            required 
          />
        </div>
        <div>
          <label>Close Time:</label>
          <input 
            type="time" 
            name="closeTime"
            value={profile.closeTime}
            onChange={handleChange}
            required 
          />
        </div>
        <div>
          <label>Specialists:</label>
          {profile.specialists && profile.specialists.map((spec, index) => (
            <div key={index}>
              <span>{spec.name} - {spec.specialization}</span>
            </div>
          ))}
          <div>
            <input
              type="text"
              placeholder="Specialist Name"
              value={newSpecialist.name}
              onChange={(e) => setNewSpecialist({ ...newSpecialist, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Specialization"
              value={newSpecialist.specialization}
              onChange={(e) => setNewSpecialist({ ...newSpecialist, specialization: e.target.value })}
            />
            <button type="button" onClick={addSpecialist} className="button">
              Add Specialist
            </button>
          </div>
        </div>
        <button type="submit" className="button">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default BusinessProfile;
