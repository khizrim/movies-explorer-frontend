import React from 'react';
import PropTypes from 'prop-types';

import useForm from '../../hooks/useForm';
import FormPage from '../FormPage/FormPage';

import './Register.css';

function Register(props) {
  const { infoMessage, onSubmit } = props;

  Register.propTypes = {
    infoMessage: PropTypes.objectOf(PropTypes.any).isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  const {
    handleChange, validateForm, values, errors, formValidity,
  } = useForm();

  const { name, email, password } = values;

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(name, email, password);
  }

  return (
    <div className="register">
      <FormPage
        title="Добро пожаловать!"
        buttonText="Зарегистрироваться"
        captionText="Уже зарегистрированы?"
        captionLinkText="Войти"
        captionLinkUrl="/signin"
        isValid={formValidity}
        validate={validateForm}
        onSubmit={handleSubmit}
        infoMessage={infoMessage}
      >
        <>
          <label htmlFor="name" className="form-page__label">
            Имя
            <input
              id="user-name"
              name="name"
              type="text"
              onChange={handleChange}
              className={`form-page__input ${
                errors.name ? 'form-page__input_type_error' : ''
              }`}
              placeholder="Жак-Ив Кусто"
              pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
              autoComplete="name"
              minLength="2"
              maxLength="30"
              required
            />
            {errors.name && (
              <span className="form-page__input-error">{errors.name}</span>
            )}
          </label>
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
              autoComplete="new-password"
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

export default Register;
