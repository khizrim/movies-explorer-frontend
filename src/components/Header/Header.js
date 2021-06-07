import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

import './Header.css';

function Header(props) {
  const { isLoggedIn } = props;

  Header.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
  };

  return (
    <header className="header">
      <Link className="header__logo-link" to="/">
        <img
          className="header__logo"
          src={logo}
          alt="Логотип Movies Explorer"
        />
      </Link>
      <Navigation isLoggedIn={isLoggedIn} />
    </header>
  );
}

export default Header;
