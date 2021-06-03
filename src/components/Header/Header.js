import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import logo from '../../images/logo.svg';

import './Header.css';
import Menu from '../Menu/Menu';

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
      <Menu isLoggedIn={isLoggedIn} />
    </header>
  );
}

export default Header;
