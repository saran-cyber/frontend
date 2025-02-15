import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BusinessDetail from './pages/BusinessDetail';
import Register from './pages/Register';
import Login from './pages/Login';
import BusinessProfile from './pages/BusinessProfile';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/business/:id" element={<BusinessDetail />} />
          <Route path="/businesses/:type" element={<BusinessDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/business-profile" element={<BusinessProfile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
