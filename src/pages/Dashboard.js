import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Navbar from '../components/Navbar';
import api from '../services/api';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:4000';

export default function Dashboard(){
  const [qr, setQr] = useState(null);
  const [waReady, setWaReady] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    const socket = io(SOCKET_URL);
    socket.on('connect', () => setStatusMsg('Socket connected'));
    socket.on('wa-qr', (dataUrl) => {
      setQr(dataUrl);
      setWaReady(false);
    });
    socket.on('wa-ready', () => { setWaReady(true); setQr(null); });
    socket.on('wa-auth-failure', (msg) => setStatusMsg('WA auth failure: ' + JSON.stringify(msg)));
    return () => socket.disconnect();
  }, []);

  async function getSessionLogs(){
    try {
      const res = await api.get('/staff/logs'); // optional route if implemented
      console.log('logs', res.data);
    } catch (e) {
      console.log('no logs route', e.message);
    }
  }

  return (
    <div className="container">
      <div className="card">
        <Navbar />
        <div style={{marginTop:16}} className="grid">
          <div>
            <h3>Dashboard</h3>
            <p className="small">Use the links to manage staff, customers and horoscopes.</p>

            <section style={{marginTop:18}}>
              <h4>WhatsApp Client</h4>
              <div className="notice">
                { waReady ? <span>WhatsApp connected ✅</span> : <span>WhatsApp not connected — scan the QR (below)</span> }
              </div>

              <div style={{marginTop:12}}>
                { qr ? (
                  <div className="qr card">
                    <div style={{textAlign:'center'}}>
                      <div className="small">Scan QR with any WhatsApp (Open WhatsApp → Settings → Linked Devices → Link a Device)</div>
                      <img src={qr} alt="wa-qr" style={{width:280, marginTop:12}} />
                    </div>
                  </div>
                ) : waReady ? (
                  <div className="small">WhatsApp client ready. Server can send OTP messages now.</div>
                ) : (
                  <div className="small">Waiting for QR or WA ready message...</div>
                ) }
              </div>
            </section>
          </div>

          <aside>
            <div className="card">
              <h4>Quick actions</h4>
              <div style={{marginTop:8}}>
                <button className="btn" onClick={getSessionLogs}>View logs (if enabled)</button>
              </div>
            </div>

            <div style={{marginTop:12}} className="card">
              <h4>Status</h4>
              <div className="small">{statusMsg}</div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
