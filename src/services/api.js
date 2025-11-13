import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
});

// attach token automatically if in localStorage
api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers['Authorization'] = `Bearer ${token}`;
  return cfg;
}, (err) => Promise.reject(err));

export function setToken(token){
  if (token) {
    localStorage.setItem('token', token);
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('token');
    delete api.defaults.headers['Authorization'];
  }
}

export default api;
