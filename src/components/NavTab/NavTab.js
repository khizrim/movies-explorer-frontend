import React from 'react';

import { HashLink } from 'react-router-hash-link';

import './NavTab.css';

function NavTab() {
  return (
    <nav className="nav-tab">
      <ul className="nav-tab__list">
        <li className="nav-tab__item">
          <HashLink className="nav-tab__link" to="#about-project">
            О проекте
          </HashLink>
        </li>
        <li className="nav-tab__item">
          <HashLink className="nav-tab__link" to="#techs">
            Технологии
          </HashLink>
        </li>
        <li className="nav-tab__item">
          <HashLink className="nav-tab__link" to="#about-me">
            Студент
          </HashLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
