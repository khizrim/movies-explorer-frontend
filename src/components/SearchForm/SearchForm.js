import React from 'react';
import PropTypes from 'prop-types';

import './SearchForm.css';

function SearchForm(props) {
  const { checkBoxState, onCheck } = props;

  SearchForm.propTypes = {
    checkBoxState: PropTypes.bool.isRequired,
    onCheck: PropTypes.func.isRequired,
  };

  return (
    <>
      <div className="search-form">
        <form className="search-form__form" id="search-form">
          <input
            type="text"
            className="search-form__input"
            placeholder="Фильм"
            id="movie"
          />
          <button
            className="search-form__button"
            type="button"
            aria-label="Найти"
          />
        </form>
        <label className="search-form__filter" htmlFor="filter">
          Короткометражки
          <input
            id="filter"
            type="checkbox"
            className="search-form__filter-checkbox"
            checked={checkBoxState}
            onChange={onCheck}
          />
        </label>
      </div>
      <hr className="search-form__divider" />
    </>
  );
}

export default SearchForm;
