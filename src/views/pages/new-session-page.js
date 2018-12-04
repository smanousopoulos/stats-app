import React from 'react';
import NewSessionForm from '../components/new-session-form';

function onCreateSession(props) {
  const courseId = props.match.params.courseId;
  console.log(courseId);

  props.history.push(`/${courseId}/in-progress`);
}

function onQuestionsChanged(val) {
  console.log('questions changed', val);
}

function onDifficultyChanged(val) {
  console.log('difficulty changed', val);
}

const NewSessionPage = (props) => (
  <div className="new-session-page">
    <NewSessionForm
      questions={3}
      difficulty="hard"
      onQuestionsChanged={onQuestionsChanged}
      onDifficultyChanged={onDifficultyChanged}
      onCreate={() => onCreateSession(props)}
    />
  </div>
);

export default NewSessionPage;
