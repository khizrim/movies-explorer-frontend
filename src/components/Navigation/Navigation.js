import React from 'react';

import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

import './Navigation.css';

function Navigation(props) {
  const { isLoggedIn } = props;

  Navigation.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
  };

  const [isOpened, setIsOpened] = React.useState(false);

  function handleMenuClick() {
    setIsOpened(!isOpened);
  }

  return (
    <nav
      className={`navigation ${isOpened ? 'navigation_opened' : ''}`}
    >
      {isLoggedIn ? (
        <>
          <button
            aria-label="Меню"
            type="button"
            className={`navigation__menu-button ${
              isOpened
                ? 'navigation__menu-button_type_close'
                : 'navigation__menu-button_type_burger'
            } `}
            onClick={handleMenuClick}
          />

          <div
            className={`navigation__menu ${
              isOpened ? 'navigation__menu_opened' : ''
            }`}
          >
            <NavLink
              exact
              to="/"
              activeClassName="navigation__nav-link_active"
              className="navigation__nav-link "
              onClick={handleMenuClick}
            >
              Главная
            </NavLink>
            <NavLink
              to="/movies"
              activeClassName="navigation__nav-link_active"
              className="navigation__nav-link "
              onClick={handleMenuClick}
            >
              Фильмы
            </NavLink>
            <NavLink
              to="/saved-movies"
              activeClassName="navigation__nav-link_active"
              className="navigation__nav-link "
              onClick={handleMenuClick}
            >
              Сохранённые фильмы
            </NavLink>
            <Link
              to="/profile"
              className="navigation__link navigation__link_type_profile "
              onClick={handleMenuClick}
            >
              Аккаунт
              <div className="navigation__profile-icon" />
            </Link>
          </div>
        </>
      ) : (
        <>
          <Link to="/signup" className="navigation__link">
            Регистрация
          </Link>
          <Link
            to="/signin"
            className="navigation__link navigation__link_type_signin"
          >
            Войти
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navigation;
