import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

import './SavedMovies.css';

function SavedMovies(props) {
  const {
    isLoggedIn, isLoading, movies, getMovies,
  } = props;

  SavedMovies.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    movies: PropTypes.arrayOf(PropTypes.object).isRequired,
    getMovies: PropTypes.func.isRequired,
  };

  const [shortFilmsOnly, setShortFilmsOnly] = React.useState(false);

  const handleShortFilmsOnly = (e) => {
    setShortFilmsOnly(e.target.checked);
    localStorage.setItem('shortFilmsOnly', e.target.checked);
  };

  React.useEffect(() => {
    getMovies();
    setShortFilmsOnly(localStorage.getItem('shortFilmsOnly') === 'true');
  }, []);

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
      />
      <SearchForm
        checkBoxState={shortFilmsOnly}
        onCheck={handleShortFilmsOnly}
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

export default SavedMovies;
