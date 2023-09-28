import React from 'react';

function SearchResults({ results }) {
  if (!results || !Array.isArray(results) || results.length === 0) {
    return <p>Inga resultat visas här</p>;
  }

  return (
    <div class="flex justify-center content-center ">
      <ul class="flex flex-wrap justify-center content-center min-w-full">
        {results.map((result) => (
          <li class="" key={result.imdbID}>
            <img class="m-5 max-h-25" src={result.Poster} alt={result.Title} />
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
