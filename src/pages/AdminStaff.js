import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../services/api';

export default function AdminStaff(){
  const [staff, setStaff] = useState([]);
  const [form, setForm] = useState({ name:'', mobile:'', email:'', password:'', role:'staff' });
  const [loading, setLoading] = useState(false);

  useEffect(()=> { fetchStaff(); }, []);

  async function fetchStaff(){
    try {
      const res = await api.get('/staff');
      setStaff(res.data);
    } catch (e) {
      alert(e.response?.data?.error || e.message);
    }
  }

  async function createStaff(e){
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/staff', form);
      setForm({ name:'', mobile:'', email:'', password:'', role:'staff' });
      fetchStaff();
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    } finally { setLoading(false); }
  }

  async function deleteStaff(id){
    if (!window.confirm('Delete staff?')) return;
    try {
      await api.delete(`/staff/${id}`);
      fetchStaff();
    } catch (e) { alert(e.response?.data?.error || e.message); }
  }

  async function resetPassword(id){
    const pw = prompt('Enter new password');
    if (!pw) return;
    try {
      await api.post(`/staff/${id}/reset-password`, { newPassword: pw });
      alert('Password reset');
    } catch (e) { alert(e.response?.data?.error || e.message); }
  }

  return (
    <div className="container">
      <div className="card">
        <Navbar />
        <h3 style={{marginTop:12}}>Admin — Staff management</h3>

        <div style={{display:'flex', gap:16, marginTop:12}}>
          <div style={{flex:1}}>
            <div className="card">
              <h4>Create staff</h4>
              <form onSubmit={createStaff}>
                <div className="form-row">
                  <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
                </div>
                <div className="form-row">
                  <input className="input" placeholder="Mobile (9198...)" value={form.mobile} onChange={e=>setForm({...form, mobile:e.target.value})} />
                </div>
                <div className="form-row">
                  <input className="input" placeholder="Email (optional)" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
                </div>
                <div className="form-row">
                  <input className="input" placeholder="Password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
                </div>
                <div style={{display:'flex', gap:8}}>
                  <button className="btn" disabled={loading}>Create</button>
                </div>
              </form>
            </div>
          </div>

          <div style={{flex:1}}>
            <div className="card">
              <h4>Existing staff</h4>
              <table className="table">
                <thead><tr><th>Name</th><th>Mobile</th><th>Role</th><th>Actions</th></tr></thead>
                <tbody>
                  {staff.map(s => (
                    <tr key={s.id}>
                      <td>{s.name}</td>
                      <td>{s.mobile}</td>
                      <td>{s.role}</td>
                      <td className="actions">
                        <button className="btn-outline" onClick={()=>resetPassword(s.id)}>Reset PW</button>
                        <button className="btn-outline" onClick={()=>deleteStaff(s.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                  {staff.length===0 && <tr><td colSpan="4" className="small">No staff found</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
