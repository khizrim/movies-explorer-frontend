import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

import './SavedMovies.css';

function SavedMovies(props) {
  const {
    isLoggedIn, isLoading, movies,
  } = props;

  SavedMovies.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
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

export default SavedMovies;
