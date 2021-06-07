import React from 'react';
import PropTypes from 'prop-types';

import './MoviesCard.css';
import { Route } from 'react-router';

function MoviesCard(props) {
  const {
    cover, title, duration, isSaved,
  } = props;

  MoviesCard.propTypes = {
    cover: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    isSaved: PropTypes.bool.isRequired,
  };

  return (
    <article className="movies-card">
      <div className="movies-card__body">
        <div className="movies-card__info">
          <h4 className="movies-card__title">{title}</h4>
          <span className="movies-card__duration">{duration}</span>
        </div>
        <Route exact path="/movies">
          <button
            type="button"
            aria-label="Сохранить"
            className={`movies-card__save-button ${isSaved ? 'movies-card__save-button_active' : ''}`}
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
      <img src={cover} className="movies-card__cover-image" alt={title} />
    </article>
  );
}

export default MoviesCard;
