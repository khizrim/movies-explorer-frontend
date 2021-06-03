import React from 'react';

import Header from '../Header/Header';

import './Profile.css';

function Profile() {
  return (
    <>
      <Header isLoggedIn />
      <section className="profile">
        <h1 className="profile__title">Привет, Виталий!</h1>
        <form className="profile__form" id="profile">
          <label className="profile__label" htmlFor="name">
            Имя
            <input
              id="user-name"
              name="name"
              type="text"
              defaultValue="Виталий"
              className="profile__input"
              autoComplete="off"
              minLength="2"
              required
            />
          </label>
          <hr className="profile__divider" />
          <label className="profile__label" htmlFor="email">
            Почта
            <input
              id="user-email"
              name="email"
              type="email"
              defaultValue="vitaliy@yandex.ru"
              className="profile__input"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              autoComplete="off"
              minLength="2"
              required
            />
          </label>
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
          >
            Выйти из аккаунта
          </button>
        </div>
      </section>
    </>
  );
}

export default Profile;
