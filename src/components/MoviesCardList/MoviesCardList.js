import React from 'react';
import PropTypes from 'prop-types';

import { MOVIES_PER_PAGE } from '../../utils/constants';

import useWindowWidth from '../../hooks/useWindowWidth';

import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

import './MoviesCardList.css';

function MoviesCardList(props) {
  const {
    isLoading,
    isNothingFound,
    isError,
    moviesList,
    savedMoviesList,
    onMovieSave,
    onMovieDelete,
    onlySaved,
  } = props;

  MoviesCardList.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isNothingFound: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    moviesList: PropTypes.arrayOf(PropTypes.object).isRequired,
    savedMoviesList: PropTypes.arrayOf(PropTypes.object).isRequired,
    onMovieSave: PropTypes.func.isRequired,
    onMovieDelete: PropTypes.func.isRequired,
    onlySaved: PropTypes.bool.isRequired,
  };

  const screenWidth = useWindowWidth();

  const [isButtonHidden, setIsButtonHidden] = React.useState(true);

  const [moviesToShow, setMoviesToShow] = React.useState(
    MOVIES_PER_PAGE.DEFAULT.TO_SHOW,
  );

  const [moviesToAdd, setMoviesToAdd] = React.useState(
    MOVIES_PER_PAGE.DEFAULT.TO_ADD,
  );

  const handleShowMoreMovies = () => {
    setMoviesToShow(moviesToShow + moviesToAdd);
  };

  const handleMovieLikeState = (movie) => savedMoviesList.some(
    (savedMovie) => savedMovie.movieId === movie.id,
  );

  const listToShow = onlySaved ? savedMoviesList : moviesList;

  const getInitialMoviesMarkup = () => listToShow.slice(0, moviesToShow).map((movie) => {
    const savedCard = savedMoviesList.find((m) => m.movieId === movie.id);
    const savedCardId = savedCard ? savedCard._id : null;
    return (
      <MoviesCard
        key={movie.id}
        movie={{ ...movie, _id: savedCardId }}
        handleMovieLikeState={handleMovieLikeState}
        onMovieSave={onMovieSave}
        onMovieDelete={onMovieDelete}
      />
    );
  });

  const getSavedMoviesMarkup = () => listToShow
    .slice(0, moviesToShow)
    .map((movie) => (
      <MoviesCard
        key={movie._id}
        movie={movie}
        handleMovieLikeState={handleMovieLikeState}
        onMovieSave={onMovieSave}
        onMovieDelete={onMovieDelete}
      />
    ));

  React.useEffect(() => {
    const isAll = listToShow.length <= moviesToShow;

    isAll ? setIsButtonHidden(true) : setIsButtonHidden(false);
  }, [listToShow, moviesToShow]);

  React.useEffect(() => {
    screenWidth;
    if (screenWidth <= 619) {
      setMoviesToShow(MOVIES_PER_PAGE.SMALL.TO_SHOW);
      setMoviesToAdd(MOVIES_PER_PAGE.SMALL.TO_ADD);
    }
    if (screenWidth > 619 && screenWidth <= 969) {
      setMoviesToShow(MOVIES_PER_PAGE.MEDIUM.TO_SHOW);
      setMoviesToAdd(MOVIES_PER_PAGE.MEDIUM.TO_ADD);
    }
    if (screenWidth > 969) {
      setMoviesToShow(MOVIES_PER_PAGE.LARGE.TO_SHOW);
      setMoviesToAdd(MOVIES_PER_PAGE.LARGE.TO_ADD);
    }
  }, [screenWidth]);

  return (
    <section className="movies-cards">
      {isLoading ? (
        <Preloader />
      ) : isNothingFound || isError ? (
        <p
          className={`movies-cards__message ${
            isError && 'movies-cards__message_error'
          }`}
        >
          {isError
            ? `Во время запроса произошла ошибка.
              Возможно, проблема с соединением или сервер недоступен.
              Подождите немного и попробуйте ещё раз.`
            : 'Ничего не найдено'}
        </p>
      ) : (
        <>
          <div className="movies-cards__list">
            {onlySaved ? getSavedMoviesMarkup() : getInitialMoviesMarkup()}
          </div>
          <button
            className={`movies-cards__more ${
              isButtonHidden ? 'movies-cards__more_hidden' : ''
            }`}
            type="button"
            onClick={handleShowMoreMovies}
          >
            Ещё
          </button>
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
