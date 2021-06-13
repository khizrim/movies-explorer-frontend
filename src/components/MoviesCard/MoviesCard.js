/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';

import { MOVIES_URL } from '../../utils/constants';

import noCover from '../../images/no-cover.svg';
import calcDuration from '../../utils/calcDuration';

import './MoviesCard.css';

function MoviesCard(props) {
  const {
    movie, handleMovieLikeState, onMovieSave, onMovieDelete,
  } = props;

  MoviesCard.propTypes = {
    movie: PropTypes.objectOf(PropTypes.any).isRequired,
    handleMovieLikeState: PropTypes.func.isRequired,
    onMovieSave: PropTypes.func.isRequired,
    onMovieDelete: PropTypes.func.isRequired,
  };

  const [isSaved, setIsSaved] = React.useState(handleMovieLikeState(movie));

  const movieImage = movie.image.url
    ? `${MOVIES_URL}${movie.image.url}`
    : movie.image
      ? movie.image
      : noCover;

  function handleMovieSave() {
    onMovieSave(movie);
    setIsSaved(!isSaved);
  }

  function handleMovieDelete() {
    onMovieDelete(movie._id);
    setIsSaved(!isSaved);
  }

  React.useEffect(() => {
    handleMovieLikeState(movie);
  }, []);

  return (
    <article className="movies-card">
      <div className="movies-card__body">
        <div className="movies-card__info">
          <h4 className="movies-card__title">{movie.nameRU}</h4>
          <span className="movies-card__duration">
            {calcDuration(movie.duration)}
          </span>
        </div>
        <Route exact path="/movies">
          <button
            type="button"
            aria-label="Сохранить"
            className={`movies-card__save-button ${
              isSaved ? 'movies-card__save-button_active' : ''
            }`}
            onClick={isSaved ? handleMovieDelete : handleMovieSave}
          />
        </Route>
        <Route exact path="/saved-movies">
          <button
            type="button"
            aria-label="Удалить"
            className="movies-card__delete-button"
            onClick={handleMovieDelete}
          />
        </Route>
      </div>
      <Link
        to={{ pathname: movie.trailerLink }}
        className="movies-card__cover-link"
        target="_blank"
      >
        <img
          src={movieImage}
          className="movies-card__cover-image"
          alt={movie.nameRU}
        />
      </Link>
    </article>
  );
}

export default MoviesCard;
