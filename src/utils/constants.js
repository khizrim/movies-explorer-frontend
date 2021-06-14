const MAIN_URL = 'https://api.movies-explorer.khizrim.ru';
const MOVIES_URL = 'https://api.nomoreparties.co';

const MOVIES_PER_PAGE = {
  LARGE: {
    TO_SHOW: 12,
    TO_ADD: 3,
  },
  MEDIUM: {
    TO_SHOW: 8,
    ADDTO_ADDMORE: 2,
  },
  SMALL: {
    TO_SHOW: 5,
    TO_ADD: 2,
  },
  DEFAULT: {
    TO_SHOW: 6,
    TO_ADD: 3,
  },
};

const SHORT_MOVIE_DURATION = 40;

export {
  MAIN_URL, MOVIES_URL, MOVIES_PER_PAGE, SHORT_MOVIE_DURATION,
};
