/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';

import filterMovies from '../../utils/filterMovies';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

import './Movies.css';

function Movies(props) {
  const {
    isLoading, isError, movies, savedMovies, getMovies, onMovieSave, onMovieDelete,
  } = props;

  Movies.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    movies: PropTypes.arrayOf(PropTypes.object).isRequired,
    savedMovies: PropTypes.arrayOf(PropTypes.object).isRequired,
    getMovies: PropTypes.func.isRequired,
    onMovieSave: PropTypes.func.isRequired,
    onMovieDelete: PropTypes.func.isRequired,
  };

  const [searchKey, setSearchKey] = React.useState('');
  const [shortFilmsOnly, setShortFilmsOnly] = React.useState(false);
  const [shownMovies, setShownMovies] = React.useState([]);
  const [isNothingFound, setIsNothingFound] = React.useState(false);

  const handleShortFilmsOnly = (e) => {
    setShortFilmsOnly(e.target.checked);
    localStorage.setItem('shortFilmsOnly', e.target.checked);
  };

  const handleSearchQuery = (key) => {
    setSearchKey(key);
    localStorage.setItem('searchKey', key);
  };

  React.useEffect(() => {
    getMovies();
    setShortFilmsOnly(localStorage.getItem('shortFilmsOnly') === 'true');
    setSearchKey(localStorage.getItem('searchKey'));
  }, []);

  React.useEffect(() => {
    if (searchKey) {
      const filteredMovies = filterMovies(
        movies,
        searchKey,
        shortFilmsOnly,
      );

      !filteredMovies.length
        ? setIsNothingFound(true)
        : setIsNothingFound(false);

      setShownMovies(filteredMovies);
    }
  }, [searchKey, shortFilmsOnly]);

  return (
    <>
      <SearchForm
        checkBoxState={shortFilmsOnly}
        onCheck={handleShortFilmsOnly}
        onSubmit={handleSearchQuery}
        onlySaved={false}
      />
      <MoviesCardList
        isLoading={isLoading}
        isNothingFound={isNothingFound}
        isError={isError}
        shortFilmsOnly={shortFilmsOnly}
        moviesList={shownMovies}
        savedMoviesList={savedMovies}
        onMovieSave={onMovieSave}
        onMovieDelete={onMovieDelete}
        onlySaved={false}
      />
      <Footer />
    </>
  );
}

export default Movies;
