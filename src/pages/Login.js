import React, { useState } from 'react';
import api, { setToken } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handlePasswordLogin(e){
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { mobile, password });
      setToken(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    } finally { setLoading(false); }
  }

  async function requestOtp(){
    if (!mobile) return alert('Enter mobile in international format e.g. 9198xxxxxxx');
    setLoading(true);
    try {
      await api.post('/auth/request-otp', { mobile, purpose: 'login' });
      localStorage.setItem('otp_mobile', mobile);
      navigate('/otp');
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    } finally { setLoading(false); }
  }

  return (
    <div className="container">
      <div className="card" style={{maxWidth:640, margin:'0 auto'}}>
        <div className="header">
          <div>
            <div className="brand">AstroDB</div>
            <div className="small">Staff / Admin login</div>
          </div>
          <div className="small">Secure prototype</div>
        </div>

        <div style={{marginTop:18}}>
          <form onSubmit={handlePasswordLogin}>
            <div className="form-row">
              <input className="input" placeholder="Mobile (e.g. 9198...)" value={mobile} onChange={e=>setMobile(e.target.value)} />
            </div>
            <div className="form-row">
              <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
            </div>
            <div style={{display:'flex', gap:8}}>
              <button className="btn" disabled={loading} type="submit">Login</button>
              <button type="button" className="btn-outline" onClick={requestOtp} disabled={loading}>
                Login with WhatsApp OTP
              </button>
            </div>
          </form>

          <div style={{marginTop:14}} className="small">
            Use password or request OTP. For OTP the admin must have scanned the WhatsApp QR on server dashboard.
          </div>
        </div>
      </div>
    </div>
  );
}
