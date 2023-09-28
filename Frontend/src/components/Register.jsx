import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const registrationData = {
        username,
        password,
      };

      const response = await axios.post('http://localhost:3001/api/register', registrationData);

      const message = response.data.message;

      console.log(`Registrering lyckades: ${message}`);
    } catch (error) {
      console.error('Fel vid registrering:', error);
    }
  };

  return (
    <div>
      <h1>Registrera dig</h1>
      <form>
        <div>
          <label>Användarnamn:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Lösenord:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="button" onClick={handleRegister}>Registrera</button>
      </form>
    </div>
  );
}

export default Register;
