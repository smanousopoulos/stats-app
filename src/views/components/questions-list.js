import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import Question from './question';

const QuestionsList = (props) => {
  const { questions, onQuestionAnswered, onComplete } = props;
  return (
    <div className="questions-list">
      <div>
        {
          questions.map(question => (
            <Question
              key={question.id}
              id={question.id}
              question={question.question}
              selected={question.selected}
              answers={question.answers}
              onSelect={(value) => { onQuestionAnswered(question.id, value); }}
            />
          ))
        }
      </div>
      <Button
        color="primary"
        onClick={() => onComplete()}
      >
        Submit
      </Button>
    </div>
  );
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