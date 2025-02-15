import React, { useState } from 'react';
import axios from 'axios';

const AppointmentForm = ({ businessId }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/appointments', {
        businessId,
        customerName,
        customerPhone,
        appointmentDate
      });
      alert('Appointment booked successfully!');
      setCustomerName('');
      setCustomerPhone('');
      setAppointmentDate('');
    } catch (err) {
      console.error(err);
      alert('Error booking appointment');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '15px' }}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="text"
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Appointment Date & Time:</label>
        <input
          type="datetime-local"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          required
        />
      </div>
      <button className="button" type="submit">
        Submit
      </button>
    </form>
  );
};

export default AppointmentForm;
