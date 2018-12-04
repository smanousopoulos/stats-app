import React from 'react';
import PropTypes from 'prop-types';

const Question = () => {
  return <div />;
};

Question.propTypes = {
  question: PropTypes.string.isRequired,
  selected: PropTypes.number,
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Question;