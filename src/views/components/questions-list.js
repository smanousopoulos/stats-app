import React from 'react';
import PropTypes from 'prop-types';

const QuestionsList = () => {
  return <div />;
};

QuestionsList.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      question: PropTypes.string,
      answers: PropTypes.arrayOf(PropTypes.string).isRequired,
      selected: PropTypes.number,
    })).isRequired,
  onQuestionAnswered: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default QuestionsList;