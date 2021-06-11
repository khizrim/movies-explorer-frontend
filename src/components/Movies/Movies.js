import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

import './Movies.css';

function Movies(props) {
  const {
    isLoggedIn, isLoading, movies, getMovies,
  } = props;

  Movies.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    movies: PropTypes.arrayOf(PropTypes.object).isRequired,
    getMovies: PropTypes.func.isRequired,
  };

  const [shortMoviesOnly, setShortMoviesOnly] = React.useState(false);

  const handleShortMoviesOnly = (e) => {
    setShortMoviesOnly(e.target.checked);
    localStorage.setItem('shortMoviesOnly', e.target.checked);
  };

  React.useEffect(() => {
    getMovies();
    setShortMoviesOnly(localStorage.getItem('shortMoviesOnly') === 'true');
  }, []);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <SearchForm
        checkBoxState={shortMoviesOnly}
        onCheck={handleShortMoviesOnly}
      />
      <MoviesCardList
        isLoading={isLoading}
        moviesList={movies}
        onlySaved={false}
      />
      <Footer />
    </>
  );
}

export default Movies;
