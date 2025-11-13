import jwtDecode from 'jwt-decode';

export function getUserFromToken(){
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const payload = jwtDecode(token);
    return payload;
  } catch (e) {
    return null;
  }
}
