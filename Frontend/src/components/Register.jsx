import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const registrationData = {
        username,
        password,
      };

      const response = await axios.post('http://localhost:3001/api/register', registrationData);

      const message = response.data.message;

      console.log(`Registrering lyckades: ${message}`);
      setErrorMessage(''); 
    } catch (error) {
      console.error('Fel vid registrering:', error);
      setErrorMessage('Användarnamnet är redan upptaget. Välj ett annat.');
    }

    navigate('/resultPage');

  };

  return (
    <div>
      <h1>Registrera dig</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} 
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
