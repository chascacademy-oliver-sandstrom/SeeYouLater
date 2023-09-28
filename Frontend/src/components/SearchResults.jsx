import React from 'react';

function SearchResults({ results, addToWatchlist }) { 
  if (!results || !Array.isArray(results) || results.length === 0) {
    return <p>Inga resultat visas här</p>;
  }

  return (
    <div className="flex justify-center content-center ">
      <ul className="flex flex-wrap justify-center content-center min-w-full">
        {results.map((result) => (
          <li className="" key={result.imdbID}>
            <div className="relative">
              <img className="m-5 max-h-25" src={result.Poster} alt={result.Title} />
              <button
                className="absolute top-0 right-0 m-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 focus:outline-none"
                onClick={() => addToWatchlist(result)} 
              >
                Add to watchlist
              </button>
            </div>
            <p>{result.Title}</p>
            <p>{result.Year}</p>
            <p>{result.Actors}</p>
            <p>{result.Plot}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;
