import React from 'react';
import QuestionsList from '../components/questions-list';

const dummyQuestions = [
  {
    id: '1',
    question: 'What is 1+1?',
    answers: [
      '1',
      '2',
      '11',
    ],
    selected: 1
  },
  {
    id: '2',
    question: 'What is the capital of Peru?',
    answers: [
      'Lima',
      'Santiago',
      'Buenos Aires',
      'Amsterdam',
    ]
  },
];

function onQuestionAnswered(id, value) {
  console.log('Answered question', id, ' with ', value);
}

function onComplete(props) {
  const courseId = props.match.params.courseId;
  alert('Complete');
  props.history.push(`/${courseId}`);
}

const InProgressPage = (props) => (
  <div className="in-progress-page">
    <QuestionsList
      questions={dummyQuestions}
      onQuestionAnswered={onQuestionAnswered}
      onComplete={() => onComplete(props)}
    />
  </div>
);

export default InProgressPage;
