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
    cover, title, duration, trailerLink, isSaved,
  } = props;

  MoviesCard.propTypes = {
    cover: PropTypes.objectOf(PropTypes.any).isRequired,
    title: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    trailerLink: PropTypes.string.isRequired,
    isSaved: PropTypes.bool,
  };

  MoviesCard.defaultProps = {
    isSaved: false,
  };

  const movieImage = cover.image ? `${MOVIES_URL}${cover.image.url}` : noCover;

  return (
    <article className="movies-card">
      <div className="movies-card__body">
        <div className="movies-card__info">
          <h4 className="movies-card__title">{title}</h4>
          <span className="movies-card__duration">
            {calcDuration(duration)}
          </span>
        </div>
        <Route exact path="/movies">
          <button
            type="button"
            aria-label="Сохранить"
            className={`movies-card__save-button ${
              isSaved ? 'movies-card__save-button_active' : ''
            }`}
          />
        </Route>
        <Route exact path="/saved-movies">
          <button
            type="button"
            aria-label="Удалить"
            className="movies-card__delete-button"
          />
        </Route>
      </div>
      <Link
        to={{ pathname: trailerLink }}
        className="movies-card__cover-link"
        target="_blank"
      >
        <img
          src={movieImage}
          className="movies-card__cover-image"
          alt={title}
        />
      </Link>
    </article>
  );
}

export default MoviesCard;
