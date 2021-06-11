import React from 'react';

import './SearchForm.css';

function SearchForm() {
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
          />
        </label>
      </div>
      <hr className="search-form__divider" />
    </>
  );
}

export default SearchForm;
