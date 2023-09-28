import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');

    navigate('/'); 
  };

  return (
    <div>
      <button onClick={handleLogout}>Logga ut</button>
    </div>
  );
}

export default Logout;
