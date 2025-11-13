import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setToken } from '../services/api';

export default function Navbar(){
  const navigate = useNavigate();
  function logout(){
    setToken(null);
    navigate('/');
  }
  return (
    <div className="header">
      <div className="brand">AstroDB</div>
      <div className="nav">
        <Link className="link" to="/dashboard">Dashboard</Link>
        <Link className="link" to="/admin/staff">Staff</Link>
        <Link className="link" to="/customers">Customers</Link>
        <Link className="link" to="/horoscopes">Horoscopes</Link>
        <button className="btn-outline" onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
