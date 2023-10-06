import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

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
    <div className={styles.registerContainer}>
      <div className={styles.registerCard}>
        <h1 className="text-2xl font-bold mb-4">Registrera dig</h1>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Användarnamn:</label>
            <input type="text" className={styles.registerInput} value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Lösenord:</label>
            <input type="password" className={styles.registerInput} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="button" className={styles.registerButton} onClick={handleRegister}>Registrera</button>
        </form>
      </div>
    </div>
  );
}


export default Register;
