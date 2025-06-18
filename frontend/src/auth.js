// src/auth.js

// save both token and user in localStorage
export const saveAuth = ({ token, user }) => {
    localStorage.setItem('bhramann_token', token);
    localStorage.setItem('bhramann_user', JSON.stringify(user));
  };
  
  // just token
  export const getToken = () =>
    localStorage.getItem('bhramann_token');
  
  // get the saved user object
  export const getUser = () => {
    const raw = localStorage.getItem('bhramann_user');
    return raw ? JSON.parse(raw) : null;
  };
  
  export const clearAuth = () => {
    localStorage.removeItem('bhramann_token');
    localStorage.removeItem('bhramann_user');
  };
  