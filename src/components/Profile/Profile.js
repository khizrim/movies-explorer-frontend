/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import useForm from '../../hooks/useForm';
import CurrentUserContext from '../../contexts/CurrentUserContext';

import InfoMessage from '../InfoMessage/InfoMessage';

import './Profile.css';

function Profile(props) {
  const { onUserUpdate, onSignOut, infoMessage } = props;

  Profile.propTypes = {
    onUserUpdate: PropTypes.func.isRequired,
    onSignOut: PropTypes.func.isRequired,
    infoMessage: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  const {
    handleChange,
    validateForm,
    setValues,
    reset,
    values,
    errors,
    formValidity,
  } = useForm();

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setValues(currentUser);
  }, [currentUser, setValues]);

  function handleSubmit(e) {
    e.preventDefault();
    onUserUpdate(values.name, values.email, reset);
  }

  return (
    <>
      <section className="profile">
        <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
        <form
          className="profile__form"
          id="profile"
          onChange={validateForm}
          onSubmit={handleSubmit}
        >
          <label className="profile__label" htmlFor="name">
            Имя
            <input
              id="user-name"
              name="name"
              type="text"
              value={values.name || ''}
              className={`profile__input ${
                errors.name ? 'profile__input_type_error' : ''
              }`}
              autoComplete="off"
              pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
              minLength="2"
              maxLength="30"
              onChange={handleChange}
              required
            />
          </label>
          {errors.name && (
            <span className="profile__input-error">{errors.name}</span>
          )}
          <hr className="profile__divider" />
          <label className="profile__label" htmlFor="email">
            Почта
            <input
              id="user-email"
              name="email"
              type="email"
              value={values.email || ''}
              className={`profile__input ${
                errors.email ? 'profile__input_type_error' : ''
              }`}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              autoComplete="off"
              minLength="2"
              onChange={handleChange}
              required
            />
          </label>
          {errors.email && (
            <span className="profile__input-error">{errors.email}</span>
          )}
        </form>
        <InfoMessage {...infoMessage} />
        <div className="profile__buttons">
          <button
            className="profile__button profile__button_type_submit"
            type="submit"
            form="profile"
            disabled={!formValidity}
          >
            Редактировать
          </button>
          <button
            className="profile__button profile__button_type_logout"
            type="button"
            onClick={onSignOut}
          >
            Выйти из аккаунта
          </button>
        </div>
      </section>
    </>
  );
}

export default Profile;
