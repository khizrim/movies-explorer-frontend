import React from 'react';

import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

import './Menu.css';

function Menu(props) {
  const { isLoggedIn } = props;

  Menu.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
  };

  const [isOpened, setIsOpened] = React.useState(false);

  function handleMenuClick() {
    setIsOpened(!isOpened);
  }

  return (
    <nav className={`menu ${isOpened ? 'menu_open' : ''}`}>
      {isLoggedIn ? (
        <>
          <button
            aria-label="Меню"
            type="button"
            className={`menu__button ${isOpened ? 'menu__button_type_close' : 'menu__button_type_burger'} `}
            onClick={handleMenuClick}
          />

          <div className={`menu__container ${isOpened ? 'menu__container_open' : ''}`}>
            <NavLink
              exact
              to="/"
              activeClassName="menu__nav-link_active"
              className="menu__nav-link "
              onClick={handleMenuClick}
            >
              Главная
            </NavLink>
            <NavLink
              to="/movies"
              activeClassName="menu__nav-link_active"
              className="menu__nav-link "
              onClick={handleMenuClick}
            >
              Фильмы
            </NavLink>
            <NavLink
              to="/saved-movies"
              activeClassName="menu__nav-link_active"
              className="menu__nav-link "
              onClick={handleMenuClick}
            >
              Сохранённые фильмы
            </NavLink>
            <Link
              to="/profile"
              className="menu__link menu__link_type_profile "
              onClick={handleMenuClick}
            >
              Аккаунт
              <div className="menu__profile-icon" />
            </Link>
          </div>
        </>
      ) : (
        <>
          <Link to="/signup" className="menu__link">Регистрация</Link>
          <Link to="/signin" className="menu__link menu__link_type_signin">Войти</Link>
        </>
      )}
    </nav>
  );
}

export default Menu;
