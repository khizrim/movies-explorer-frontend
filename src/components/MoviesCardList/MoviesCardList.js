import React from 'react';
import PropTypes from 'prop-types';

import MoviesCard from '../MoviesCard/MoviesCard';
import movies from '../../utils/moviesDB';

import './MoviesCardList.css';

function MoviesCardList(props) {
  const { onlySaved } = props;

  MoviesCardList.propTypes = {
    onlySaved: PropTypes.bool.isRequired,
  };

  const filterSaved = (movie) => (onlySaved ? movie.isSaved : movie);

  return (
    <>
      <section className="movies-card-list">
        {
          movies.filter(filterSaved).map((movie) => (
            <MoviesCard
              key={movie._id}
              title={movie.title}
              duration={movie.duration}
              cover={movie.cover}
              isSaved={movie.isSaved}
            />
          ))
        }
      </section>
      <button className="movies-card-list__more" type="button">Ещё</button>
    </>
  );
}

export default MoviesCardList;
