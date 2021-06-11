import React from 'react';
import PropTypes from 'prop-types';

import filterMovies from '../../utils/filterMovies';

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

  const [searchKey, setSearchKey] = React.useState('');
  const [shortFilmsOnly, setShortFilmsOnly] = React.useState(false);
  const [shownMovies, setShownMovies] = React.useState([]);

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
  }, []);

  React.useEffect(() => {
    if (searchKey) {
      const filteredMovies = filterMovies(movies, searchKey, shortFilmsOnly);
      setShownMovies(filteredMovies);
    }
  }, [searchKey]);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <SearchForm
        checkBoxState={shortFilmsOnly}
        onCheck={handleShortFilmsOnly}
        onSubmit={handleSearchQuery}
      />
      <MoviesCardList
        isLoading={isLoading}
        shortFilmsOnly={shortFilmsOnly}
        moviesList={shownMovies}
        onlySaved={false}
      />
      <Footer />
    </>
  );
}

export default Movies;
