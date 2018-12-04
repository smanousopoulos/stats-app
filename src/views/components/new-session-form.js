import React from 'react';
import PropTypes from 'prop-types';

const NewSessionForm = () => {
  return <div />;
};

NewSessionForm.propTypes = {
  questions: PropTypes.number.isRequired,
  difficulty: PropTypes.string.isRequired,
  onQuestionsChanged: PropTypes.func.isRequired,
  onDifficultyChanged: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
};

export default NewSessionForm;