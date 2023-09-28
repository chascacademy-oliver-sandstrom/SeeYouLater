import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Watchlist from './WatchList'; 
import Logout from './Logout';

function ResultPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [authToken, setAuthToken] = useState(null); 

  useEffect(() => {

    const token = localStorage.getItem('token');
    setAuthToken(token);
  }, []); 

  const handleSearch = (searchTerm) => {
    axios
      .get(`http://localhost:3001/api/search?s=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${authToken}`, 
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

  const addToWatchlist = (result) => {
    axios
      .post('http://localhost:3001/api/watchlist/add', {
        title: result.Title,
        year: result.Year,
        poster: result.Poster,
      })
      .then((response) => {
        console.log('Film tillagd på watchlist');
      })
      .catch((error) => {
        console.error('Fel vid försök att lägga till film på watchlist', error);
      });
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <SearchResults results={searchResults} addToWatchlist={addToWatchlist} />
      <Watchlist authToken={authToken} />
      <Logout/>
    </div>
  );
}

export default ResultPage;
