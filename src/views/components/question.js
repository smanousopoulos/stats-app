import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input } from 'reactstrap';

const Question = (props) => {
  const { id, question, answers, selected, onSelect } = props;
  return (
    <div className="question">
      <h3>{ question }</h3>
      <FormGroup>
        {
          answers.map((answer) => {
              const key = `${id}-${answer}`;
              return (
                <FormGroup key={key} check>
                  <Label check>
                    <Input
                      type="radio"
                      value={answer}
                      checked={answer === selected}
                      name={key}
                      onChange={(e) => {
                        onSelect(e.target.value);
                      }}/>
                    {answer}
                  </Label>
                </FormGroup>
              );
            })
        }
      </FormGroup>
    </div>
  );
};

Question.propTypes = {
  question: PropTypes.string.isRequired,
  selected: PropTypes.number,
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Question;