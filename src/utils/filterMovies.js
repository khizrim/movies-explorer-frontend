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
    ? res.filter((movie) => movie.duration <= 40)
    : res;
}

export default filterMovies;
