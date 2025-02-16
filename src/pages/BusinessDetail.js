import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || "https://backend-2-5m08.onrender.com";

const BusinessDetail = () => {
  const { type } = useParams();
  const [searchName, setSearchName] = useState('');
  const [matchedBusiness, setMatchedBusiness] = useState(null);
  const [specialistSearch, setSpecialistSearch] = useState('');
  const [filteredSpecialists, setFilteredSpecialists] = useState([]);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/businesses?type=${type}&search=${searchName}`);
        if (response.data.length === 1) {
          setMatchedBusiness(response.data[0]);
        } else {
          setMatchedBusiness(null);
        }
      } catch (error) {
        console.error('Error fetching business:', error);
      }
    };

    if (searchName.trim() !== '') {
      fetchBusiness();
    } else {
      setMatchedBusiness(null);
    }
  }, [searchName, type]);

  useEffect(() => {
    if (matchedBusiness && matchedBusiness.specialists) {
      const filtered = matchedBusiness.specialists.filter(spec =>
        spec.name.toLowerCase().includes(specialistSearch.toLowerCase())
      );
      setFilteredSpecialists(filtered);
    }
  }, [specialistSearch, matchedBusiness]);

  const getBusinessStatus = (openTime, closeTime) => {
    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    const [openHour, openMin] = openTime.split(':').map(Number);
    const [closeHour, closeMin] = closeTime.split(':').map(Number);
    const openMinutes = openHour * 60 + openMin;
    const closeMinutes = closeHour * 60 + closeMin;
    return nowMinutes >= openMinutes && nowMinutes < closeMinutes ? 'Open' : 'Closed';
  };

  return (
    <div className="container">
      <h1>{type} Business Profile</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter business name..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          style={{ width: '80%', padding: '10px', fontSize: '16px' }}
        />
      </div>
      {matchedBusiness ? (
        <div className="business-profile" style={{ animation: 'fadeIn 0.5s ease-out' }}>
          <h2>{matchedBusiness.name}</h2>
          <p>Status: {getBusinessStatus(matchedBusiness.openTime, matchedBusiness.closeTime)}</p>
          <p>Mobile: {matchedBusiness.mobile}</p>
          <div className="search-bar" style={{ maxWidth: '400px', margin: '20px auto' }}>
            <input
              type="text"
              placeholder="Search Specialist..."
              value={specialistSearch}
              onChange={(e) => setSpecialistSearch(e.target.value)}
              style={{ width: '100%', padding: '10px', fontSize: '16px' }}
            />
            {specialistSearch && filteredSpecialists.length > 0 && (
              <div className="suggestions">
                {filteredSpecialists.map((spec, index) => (
                  <div key={index} className="suggestion-item">
                    {spec.name} - {spec.specialization}
                  </div>
                ))}
              </div>
            )}
          </div>
          <p style={{ fontWeight: 'bold' }}>
            To book a service, please call {matchedBusiness.mobile}
          </p>
        </div>
      ) : (
        searchName.trim() !== '' && <p>No business found. Please refine your search.</p>
      )}
    </div>
  );
};

export default BusinessDetail;
