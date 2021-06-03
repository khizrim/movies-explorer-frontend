import React from 'react';

import { Link } from 'react-router-dom';

import Avatar from '../../images/avatar.jpeg';
import Section from '../Section/Section';
import Portfolio from '../Portfolio/Portfolio';

import './AboutMe.css';

function AboutMe() {
  return (
    <Section
      name="about-me"
      title="Студент"
      isDarker={false}
    >
      <>
        <div className="about-me__content">
          <div className="about-me__profile">
            <h2 className="about-me__name">Хизри</h2>
            <p className="about-me__description">Фронтенд-разработчик, 28 лет</p>
            <p className="about-me__text">
              Живу и работаю в Махачкале. С 2012 года занимался дизайном и
              маркетингом в компании «05.ru». Недавно начал кодить и ушёл в
              разработку. Это приносит больше удовольствия. Трепетно отношусь к
              типографике и сеткам, люблю всё систематизировать. Пиксель-пёрфект
              до мозга костей.
            </p>
            <ul className="about-me__links">
              <li className="about-me__links-item">
                <Link
                  className="about-me__link"
                  to={{ pathname: 'https://www.facebook.com/kh.makhmudov' }}
                  target="_blank"
                  rel="norefferer"
                >
                  Facebook
                </Link>
              </li>
              <li className="about-me__links-item">
                <Link
                  className="about-me__link"
                  to={{ pathname: 'https://github.com/khizrim' }}
                  target="_blank"
                  rel="norefferer"
                >
                  Github
                </Link>
              </li>
            </ul>
          </div>
          <img src={Avatar} alt="Хизри Махмудов" className="about-me__image" />
        </div>
        <Portfolio />
      </>
    </Section>
  );
}

export default AboutMe;
