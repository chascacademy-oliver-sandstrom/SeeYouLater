import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

function Home() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Skapa ett objekt med användarnamn och lösenord
      const loginData = {
        username,
        password,
      };

      const response = await axios.post('http://localhost:3001/api/login', loginData);

      const token = response.data.token;

      localStorage.setItem('token', token);

      console.log('Inloggning lyckades');

      navigate('/resultPage');
    } catch (error) {
      console.error('Fel vid inloggning:', error);
    }
  };

  return (
    <div>
      <h1>SeeYouLater</h1>
      <form>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="button" onClick={handleLogin}>Login</button>
      </form>
      <Link to="/register">Register</Link>
    </div>
  );
}

export default Home;
