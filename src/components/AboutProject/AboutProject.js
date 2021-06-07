import React from 'react';

import Section from '../Section/Section';

import './AboutProject.css';

function AboutProject() {
  return (
    <Section name="about-project" title="О проекте" isDarker={false}>
      <>
        <div className="about-project__content">
          <div className="about-project__item">
            <h2 className="about-project__item-title">
              Дипломный проект включал 5 этапов
            </h2>
            <p className="about-project__item-text">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className="about-project__item">
            <h2 className="about-project__item-title">
              На выполнение диплома ушло 5 недель
            </h2>
            <p className="about-project__item-text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="about-project__timeline">
          <span className="about-project__backend about-project__timeline-text" />
          <span className="about-project__frontend about-project__timeline-text" />
        </div>
      </>
    </Section>
  );
}

export default AboutProject;
