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
    handleChange,
    validateForm,
    reset,
    values,
    errors,
    formValidity,
  } = useForm();

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values.key, reset);
  }

  return (
    <>
      <div className="search-form">
        <div className="search-form__input-container">
          <form
            className="search-form__form"
            id="search-form"
            onChange={validateForm}
            onSubmit={handleSubmit}
          >
            <input
              id="movie"
              name="key"
              type="text"
              value={values.key || ''}
              onChange={handleChange}
              className="search-form__input"
              placeholder="Фильм"
              minLength="2"
              required
            />
            <button
              className={`search-form__button ${
                !formValidity ? 'search-form__button_disabled' : ''
              }`}
              type="submit"
              aria-label="Найти"
              disabled={!formValidity}
            />
          </form>
          {errors.key && (
            <span className="search-form__input-error">{errors.key}</span>
          )}
        </div>
        <label className="search-form__filter" htmlFor="filter">
          Короткометражки
          <input
            id="filter"
            type="checkbox"
            className="search-form__filter-checkbox"
            checked={checkBoxState}
            onChange={onCheck}
            disabled={!formValidity}
          />
        </label>
      </div>
      <hr className="search-form__divider" />
    </>
  );
}

export default SearchForm;
