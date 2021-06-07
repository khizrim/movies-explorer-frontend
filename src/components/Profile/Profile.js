import React from 'react';

import useForm from '../../hooks/useForm';
import Header from '../Header/Header';

import './Profile.css';

function Profile() {
  const {
    handleChange, validateForm, errors, formValidity,
  } = useForm();

  return (
    <>
      <Header isLoggedIn />
      <section className="profile">
        <h1 className="profile__title">Привет, Виталий!</h1>
        <form className="profile__form" id="profile" onChange={validateForm}>
          <label className="profile__label" htmlFor="name">
            Имя
            <input
              id="user-name"
              name="name"
              type="text"
              defaultValue="Виталий"
              className={`profile__input ${
                errors.name ? 'profile__input_type_error' : ''
              }`}
              autoComplete="off"
              minLength="2"
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
              defaultValue="vitaliy@yandex.ru"
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
        <div className="profile__buttons">
          <button
            className="profile__button profile__button_type_submit"
            type="submit"
            form="profile"
          >
            Редактировать
          </button>
          <button
            className="profile__button profile__button_type_logout"
            type="button"
            disabled={formValidity}
          >
            Выйти из аккаунта
          </button>
        </div>
      </section>
    </>
  );
}

export default Profile;
