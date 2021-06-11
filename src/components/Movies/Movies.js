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

  React.useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
      />
      <SearchForm />
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
