import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import difficulties from '../../data/difficulties';

const NewSessionForm = (props) => {
  const { onCreate, questions, difficulty, onQuestionsChanged, onDifficultyChanged } = props;

  return (
    <Form className="new-session-form">
      <FormGroup>
        <Label for="questions">Questions</Label>
        <Input
          type="number"
          step="1"
          min="0"
          name="questions"
          id="questions"
          placeholder="Number of questions"
          value={questions}
          onChange={(e) => { onQuestionsChanged(e.target.value); }}
        />
      </FormGroup>

      <FormGroup>
        <Label for="difficulty">Difficulty</Label>
        <Input
          type="select"
          name="difficulty"
          id="difficulty"
          value={difficulty}
          onChange={(e) => { onDifficultyChanged(e.target.value); }}
        >
          {
            difficulties.map(difficultyOption => (
              <option
                key={difficultyOption}
                value={difficultyOption.toLowerCase()}
              >
                { difficultyOption }
              </option>
            ))
          }
        </Input>
      </FormGroup>
      <br />

      <Button
        color="primary"
        onClick={() => onCreate()}
      >
        Create
      </Button>
    </Form>
  );
};

NewSessionForm.propTypes = {
  questions: PropTypes.number.isRequired,
  difficulty: PropTypes.string.isRequired,
  onQuestionsChanged: PropTypes.func.isRequired,
  onDifficultyChanged: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
};

export default NewSessionForm;