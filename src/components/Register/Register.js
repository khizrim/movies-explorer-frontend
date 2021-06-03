import React from 'react';

import FormPage from '../FormPage/FormPage';

import './Register.css';

function Register() {
  return (
    <div className="register">
      <FormPage
        title="Добро пожаловать!"
        buttonText="Зарегистрироваться"
        captionText="Уже зарегистрированы?"
        captionLinkText="Войти"
        captionLinkUrl="/signin"
      >
        <>
          <label htmlFor="name" className="form-page__label">
            Имя
            <input
              id="user-name"
              name="name"
              type="text"
              className="form-page__input"
              placeholder="Жак-Ив Кусто"
              autoComplete="name"
              minLength="2"
              required
            />
          </label>

          <label htmlFor="email" className="form-page__label">
            E-mail
            <input
              id="user-email"
              name="email"
              type="email"
              className="form-page__input"
              placeholder="email@domain.com"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              autoComplete="email"
              minLength="2"
              required
            />
          </label>

          <label htmlFor="password" className="form-page__label">
            Пароль
            <input
              id="user-password"
              name="password"
              type="password"
              className="form-page__input"
              autoComplete="new-password"
              placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
              minLength="8"
              required
            />
          </label>
        </>
      </FormPage>
    </div>
  );
}

export default Register;
