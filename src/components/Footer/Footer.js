import React from 'react';

import { Link } from 'react-router-dom';

import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__description">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__content">
        <p className="footer__copyright">&copy; 2021</p>
        <ul className="footer__links">
          <li className="footer__links-item">
            <Link
              className="footer__link"
              to={{ pathname: 'https://praktikum.yandex.ru' }}
              target="_blank"
              rel="norefferer"
            >
              Яндекс.Практикум
            </Link>
          </li>
          <li className="footer__links-item">
            <Link
              className="footer__link"
              to={{ pathname: 'https://github.com/khizrim' }}
              target="_blank"
              rel="norefferer"
            >
              Github
            </Link>
          </li>
          <li className="footer__links-item">
            <Link
              className="footer__link"
              to={{ pathname: 'https://www.facebook.com/kh.makhmudov' }}
              target="_blank"
              rel="norefferer"
            >
              Facebook
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
