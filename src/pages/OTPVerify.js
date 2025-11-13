import React, { useState } from 'react';
import api, { setToken } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function OTPVerify(){
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const mobile = localStorage.getItem('otp_mobile');

  async function verify(){
    if (!mobile) return alert('No mobile in storage. Request OTP first.');
    try {
      const res = await api.post('/auth/verify-otp', { mobile, otp });
      if (res.data.token) {
        setToken(res.data.token);
        navigate('/dashboard');
      } else {
        alert('Unexpected response');
      }
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  }

  return (
    <div className="container">
      <div className="card" style={{maxWidth:520, margin:'0 auto'}}>
        <h3>Verify OTP</h3>
        <div className="small">OTP sent to: {mobile}</div>
        <div className="form-row" style={{marginTop:12}}>
          <input className="input" placeholder="Enter OTP" value={otp} onChange={e=>setOtp(e.target.value)} />
          <button className="btn" onClick={verify}>Verify</button>
        </div>
        <div style={{marginTop:10}} className="small">
          If you didn't receive OTP, ask admin to check WhatsApp connection in Dashboard.
        </div>
      </div>
    </div>
  );
}
