import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import OTPVerify from './pages/OTPVerify';
import Dashboard from './pages/Dashboard';
import AdminStaff from './pages/AdminStaff';
import Customers from './pages/Customers';
import Horoscopes from './pages/Horoscopes';
import ProtectedRoute from './components/ProtectedRoute';

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/otp" element={<OTPVerify />} />
      <Route path="/dashboard" element={
        <ProtectedRoute><Dashboard /></ProtectedRoute>
      } />
      <Route path="/admin/staff" element={<ProtectedRoute><AdminStaff /></ProtectedRoute>} />
      <Route path="/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
      <Route path="/horoscopes" element={<ProtectedRoute><Horoscopes /></ProtectedRoute>} />
    </Routes>
  );
}
