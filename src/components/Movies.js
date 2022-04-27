import React, { useRef, useState } from "react";

function MovieList() {
  const searchInput = useRef("app-input1");

  const [movieList, setMovieList] = useState([]);
  const [noResult, setNoResult] = useState(false);

  const handleSearch = async (e) => {
    const year = parseInt(searchInput.current.value);

    if (true) {
      fetch("https://jsonmock.hackerrank.com/api/movies?Year=" + year)
        .then((response) => response.json())
        .then((result) => {
          if (result.data.length) {
            setMovieList(result.data);
            setNoResult(false);
          } else {
            setNoResult(true);
            setMovieList([]);
          }
        })
        .catch((error) => console.log(error));
    }
  };
  const movies = movieList ? (
    <ul className="mt-50 styled" data-testid="movieList">
      {movieList && movieList.map((row, i) => <li key={i}>{row.Title}</li>)}
    </ul>
  ) : null;
  return (
    <div className="layout-column align-items-center mt-50">
      <section className="layout-row align-items-center justify-content-center">
        <input
          ref={searchInput}
          type="number"
          className="large"
          placeholder="Enter Year eg 2015"
          data-testid="app-input"
        />
        <button
          onClick={(e) => {
            handleSearch(e);
          }}
          className=""
          data-testid="submit-button"
        >
          Search
        </button>
      </section>

      {movieList ? movies : null}

      {!noResult || (
        <div className="mt-50 slide-up-fade-in" data-testid="no-result">
          No Results Found
        </div>
      )}
    </div>
  );
}

export default MovieList;
