import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input } from 'reactstrap';

const Question = (props) => {
  const { question, answers, selected, onSelect } = props;
  return (
    <div className="question">
      <h3>{ question }</h3>
      <FormGroup>
        {
          answers.map((answer, index) => (
            <FormGroup key={answer} check>
              <Label check>
                <Input
                  type="radio"
                  value={index}
                  checked={index === selected}
                  name={answer}
                  onChange={(e) => { onSelect(e.target.value); }}/>
                { answer }
              </Label>
            </FormGroup>
          ))
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