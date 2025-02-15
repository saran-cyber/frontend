import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [businessType, setBusinessType] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (businessType) {
      navigate(`/businesses/${businessType}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <select
        value={businessType}
        onChange={(e) => setBusinessType(e.target.value)}
        required
      >
        <option value="" disabled>Select Business Type</option>
        <option value="Hospital">Hospital</option>
        <option value="Gym">Gym</option>
        <option value="Saloon">Saloon</option>
        <option value="Spas">Spas</option>
        <option value="Car Wash">Car Wash</option>
      </select>
      <button type="submit" className="button">Search</button>
    </form>
  );
};

export default SearchBar;
