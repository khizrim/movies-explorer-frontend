import React from 'react';
import PropTypes from 'prop-types';

import useForm from '../../hooks/useForm';

import './SearchForm.css';

function SearchForm(props) {
  const { checkBoxState, onCheck, onSubmit } = props;

  SearchForm.propTypes = {
    checkBoxState: PropTypes.bool.isRequired,
    onCheck: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  const {
    handleChange, values,
  } = useForm();

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values.key);
  }

  return (
    <>
      <div className="search-form">
        <form className="search-form__form" id="search-form" onSubmit={handleSubmit}>
          <input
            id="movie"
            name="key"
            type="text"
            onChange={handleChange}
            className="search-form__input"
            placeholder="Фильм"
            minLength="2"
            required
          />
          <button
            className="search-form__button"
            type="submit"
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
