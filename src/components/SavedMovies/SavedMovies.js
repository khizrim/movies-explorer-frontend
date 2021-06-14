/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';

import filterMovies from '../../utils/filterMovies';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import './SavedMovies.css';

function SavedMovies(props) {
  const {
    isLoading, isError, savedMovies, onMovieSave, onMovieDelete,
  } = props;

  SavedMovies.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    savedMovies: PropTypes.arrayOf(PropTypes.object).isRequired,
    onMovieSave: PropTypes.func.isRequired,
    onMovieDelete: PropTypes.func.isRequired,
  };

  const [searchKey, setSearchKey] = React.useState('');
  const [shortFilmsOnly, setShortFilmsOnly] = React.useState(false);
  const [shownMovies, setShownMovies] = React.useState([]);
  const [isNothingFound, setIsNothingFound] = React.useState(false);

  const handleShortFilmsOnly = (e) => {
    setShortFilmsOnly(e.target.checked);
  };

  const handleSearchQuery = (key) => {
    setSearchKey(key);
  };

  React.useEffect(() => {
    let filteredMovies;

    if (searchKey) {
      filteredMovies = filterMovies(
        savedMovies,
        searchKey,
        shortFilmsOnly,
      );

      setShownMovies(filteredMovies);
    } else {
      filteredMovies = filterMovies(
        savedMovies,
        null,
        shortFilmsOnly,
      );

      setShownMovies(filteredMovies);
    }

    !filteredMovies.length
      ? setIsNothingFound(true)
      : setIsNothingFound(false);
  }, [searchKey, shortFilmsOnly, savedMovies]);

  return (
    <>
      <SearchForm
        checkBoxState={shortFilmsOnly}
        onCheck={handleShortFilmsOnly}
        onSubmit={handleSearchQuery}
        onlySaved
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
        onlySaved
      />
      <Footer />
    </>
  );
}

export default SavedMovies;
