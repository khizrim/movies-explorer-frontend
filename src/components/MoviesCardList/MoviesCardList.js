import React from 'react';
import PropTypes from 'prop-types';

import { MOVIES_PER_PAGE } from '../../utils/constants';

import useWindowWidth from '../../hooks/useWindowWidth';

import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

import './MoviesCardList.css';

function MoviesCardList(props) {
  const {
    isLoading, moviesList, onlySaved,
  } = props;

  const screenWidth = useWindowWidth();

  MoviesCardList.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    moviesList: PropTypes.arrayOf(PropTypes.object).isRequired,
    onlySaved: PropTypes.bool.isRequired,
  };

  const [moviesToShow, setMoviesToShow] = React.useState(
    MOVIES_PER_PAGE.DEFAULT.TO_SHOW,
  );

  const [moviesToAdd, setMoviesToAdd] = React.useState(
    MOVIES_PER_PAGE.DEFAULT.TO_ADD,
  );

  const filterSaved = (movie) => (onlySaved ? movie.isSaved : movie);

  const handleShowMoreMovies = () => {
    setMoviesToShow(moviesToShow + moviesToAdd);
  };

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

  return isLoading ? (
    <Preloader />
  ) : (
    <>
      <section className="movies-card-list">
        {moviesList
          .filter(filterSaved)
          .slice(0, moviesToShow)
          .map((movie) => (
            <MoviesCard
              key={movie.id}
              title={movie.nameRU}
              duration={movie.duration}
              trailerLink={movie.trailerLink}
              cover={movie}
              isSaved={movie.isSaved}
            />
          ))}
      </section>
      <button
        className="movies-card-list__more"
        type="button"
        onClick={handleShowMoreMovies}
      >
        Ещё
      </button>
    </>
  );
}

export default MoviesCardList;
