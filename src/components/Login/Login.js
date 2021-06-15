import React from 'react';
import PropTypes from 'prop-types';

import useForm from '../../hooks/useForm';
import FormPage from '../FormPage/FormPage';

import './Login.css';

function Login(props) {
  const {
    isSubmitting, buttonState, infoMessage, onSubmit,
  } = props;

  Login.propTypes = {
    isSubmitting: PropTypes.bool.isRequired,
    buttonState: PropTypes.string.isRequired,
    infoMessage: PropTypes.objectOf(PropTypes.any).isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  const {
    handleChange, validateForm, values, errors, formValidity,
  } = useForm();

  const { email, password } = values;

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(email, password);
  }

  return (
    <div className="login">
      <FormPage
        title="Рады видеть!"
        buttonText={buttonState || 'Войти'}
        captionText="Ещё не зарегистрированы?"
        captionLinkText="Регистрация"
        captionLinkUrl="/signup"
        isValid={formValidity}
        validate={validateForm}
        onSubmit={handleSubmit}
        infoMessage={infoMessage}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
