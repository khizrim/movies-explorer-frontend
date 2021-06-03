import React from 'react';

import FormPage from '../FormPage/FormPage';

import './Login.css';

function Login() {
  return (
    <div className="login">
      <FormPage
        title="Рады видеть!"
        buttonText="Войти"
        captionText="Ещё не зарегистрированы?"
        captionLinkText="Регистрация"
        captionLinkUrl="/signup"
      >
        <>
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
              autoComplete="current-password"
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

export default Login;
