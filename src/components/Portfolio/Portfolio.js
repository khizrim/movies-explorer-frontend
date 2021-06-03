import React from 'react';

import { Link } from 'react-router-dom';

import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <Link
            className="portfolio__item-link"
            to={{ pathname: 'https://khizrim.github.io/how-to-learn/' }}
            target="_blank"
            rel="norefferer"
          >
            <h3 className="portfolio__item-title">Статичный сайт</h3>
            <p className="portfolio__item-arrow">&#8599;</p>
          </Link>
        </li>
        <li className="portfolio__item">
          <Link
            className="portfolio__item-link"
            to={{ pathname: 'https://khizrim.github.io/russian-travel/' }}
            target="_blank"
            rel="norefferer"
          >
            <h3 className="portfolio__item-title">Адаптивный сайт</h3>
            <p className="portfolio__item-arrow">&#8599;</p>
          </Link>
        </li>
        <li className="portfolio__item">
          <Link
            className="portfolio__item-link"
            to={{ pathname: 'https://mesto.khizrim.ru' }}
            target="_blank"
            rel="norefferer"
          >
            <h3 className="portfolio__item-title">Одностраничное приложение</h3>
            <p className="portfolio__item-arrow">&#8599;</p>
          </Link>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
