import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

function ResultPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [authToken, setAuthToken] = useState(null); // State för JWT-token

  useEffect(() => {
    // Hämta JWT-token från localStorage när komponenten monteras
    const token = localStorage.getItem('token');
    setAuthToken(token);
  }, []); // Tomt beroende för att köra detta en gång när komponenten monteras

  const handleSearch = (searchTerm) => {
    axios
      .get(`http://localhost:3001/api/search?s=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${authToken}`, // Inkludera JWT-token i begärandet
        },
      })
      .then((response) => {
        const results = response.data.Search;
        console.log(results);
        setSearchResults(results);
      })
      .catch((error) => {
        console.error('Fel vid sökning:', error);
        setSearchResults([]);
      });
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <SearchResults results={searchResults} />
    </div>
  );
}

export default ResultPage;
