import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import './FormPage.css';
import logo from '../../images/logo.svg';

function FormPage(props) {
  const {
    title,
    buttonText,
    captionText,
    captionLinkText,
    captionLinkUrl,
    children,
  } = props;

  FormPage.propTypes = {
    title: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    captionText: PropTypes.string.isRequired,
    captionLinkText: PropTypes.string.isRequired,
    captionLinkUrl: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
  };

  return (
    <div className="form-page">
      <Link className="form-page__logo-link" to="/">
        <img
          className="form-page__logo"
          src={logo}
          alt="Логотип Movies Explorer"
        />
      </Link>
      <h1 className="form-page__title">{title}</h1>
      <form className="form-page__form" id="form-page" autoComplete="on">
        {children}
      </form>
      <button form="form-page" className="form-page__button" type="submit">
        {buttonText}
      </button>
      <div className="form-page__caption">
        <p className="form-page__caption-text">{captionText}</p>
        <Link to={captionLinkUrl} className="form-page__caption-link">
          {captionLinkText}
        </Link>
      </div>
    </div>
  );
}

export default FormPage;