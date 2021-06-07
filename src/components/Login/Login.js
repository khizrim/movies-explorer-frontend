import React from 'react';

import useForm from '../../hooks/useForm';
import FormPage from '../FormPage/FormPage';

import './Login.css';

function Login() {
  const {
    handleChange, validateForm, errors, formValidity,
  } = useForm();

  return (
    <div className="login">
      <FormPage
        title="Рады видеть!"
        buttonText="Войти"
        captionText="Ещё не зарегистрированы?"
        captionLinkText="Регистрация"
        captionLinkUrl="/signup"
        isValid={formValidity}
        validate={validateForm}
      >
        <>
          <label htmlFor="email" className="form-page__label">
            E-mail
            <input
              id="user-email"
              name="email"
              type="email"
              onChange={handleChange}
              className={`form-page__input ${
                errors.email ? 'form-page__input_type_error' : ''
              }`}
              placeholder="email@domain.com"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              autoComplete="email"
              minLength="2"
              required
            />
            {errors.email && (
              <span className="form-page__input-error">{errors.email}</span>
            )}
          </label>

          <label htmlFor="password" className="form-page__label">
            Пароль
            <input
              id="user-password"
              name="password"
              type="password"
              onChange={handleChange}
              className={`form-page__input ${
                errors.password ? 'form-page__input_type_error' : ''
              }`}
              autoComplete="current-password"
              placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
              minLength="8"
              required
            />
            {errors.password && (
              <span className="form-page__input-error">{errors.password}</span>
            )}
          </label>
        </>
      </FormPage>
    </div>
  );
}

export default Login;
