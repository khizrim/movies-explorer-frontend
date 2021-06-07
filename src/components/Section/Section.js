import React from 'react';
import PropTypes from 'prop-types';

import './Section.css';

function Section(props) {
  const { name, title, children } = props;

  Section.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
  };

  return (
    <section className={`${name} section`} id={name}>
      <h1 className="section__title">{title}</h1>
      {children}
    </section>
  );
}

export default Section;
