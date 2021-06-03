import React from 'react';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

import './SavedMovies.css';

function SavedMovies() {
  return (
    <>
      <Header isLoggedIn />
      <SearchForm />
      <MoviesCardList onlySaved />
      <Footer />
    </>
  );
}

export default SavedMovies;
