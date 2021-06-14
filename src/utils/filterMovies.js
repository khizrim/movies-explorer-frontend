import { SHORT_MOVIE_DURATION } from './constants';

function filterMovies(movies, key, onlyShort) {
  const res = movies.filter((movie) => {
    const { nameRU, nameEN } = movie;

    return (
      String(nameRU)
        .toLowerCase()
        .indexOf(key.toLowerCase()) !== -1
      || String(nameEN)
        .toLowerCase()
        .indexOf(key.toLowerCase()) !== -1
    );
  });

  return onlyShort
    ? res.filter((movie) => movie.duration <= SHORT_MOVIE_DURATION)
    : res;
}

export default filterMovies;
