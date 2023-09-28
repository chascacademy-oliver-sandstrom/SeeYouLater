import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Watchlist({ authToken }) {
  const [watchlist, setWatchlist] = useState([]);
  const [error, setError] = useState(null); 

  useEffect(() => {
    if (!authToken) {
      return;
    }

    axios
      .get('http://localhost:3001/api/watchlist', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setWatchlist(response.data);
        setError(null); 
      })
      .catch((error) => {
        console.error('Fel vid hämtning av watchlist:', error);
        setError('Ett fel uppstod vid hämtning av watchlist.'); 
      });
  }, [authToken]);

  return (
    <div>
      <h2>Din Watchlist</h2>
      {error ? ( <p>{error}</p>) : (
        <ul>
          {watchlist.map((response) => (
            <li key={response._id}>
              <p>{response.title} ({response.year})</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Watchlist;
