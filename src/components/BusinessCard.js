import React from 'react';

const BusinessCard = ({ business }) => {
  return (
    <div className="business-card">
      <h2>{business.name}</h2>
      <p>Type: {business.type}</p>
      <p>Mobile: {business.mobile}</p>
    </div>
  );
};

export default BusinessCard;
