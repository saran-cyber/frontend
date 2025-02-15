import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/register">Register Account</Link>
      <Link to="/login">Business Login</Link>
      <Link to="/business-profile">Profile</Link>
    </nav>
  );
};

export default Navbar;
