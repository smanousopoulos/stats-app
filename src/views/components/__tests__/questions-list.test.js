import React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'reactstrap';
import QuestionsList from '../questions-list';
import Question from '../question';

describe('Questions List', () => {
  let shallowComponent;
  const questions = [
    {
      id: 'q1',
      question: 'What is 1+1?',
      answers: [
        '2',
        '11',
        '1',
      ],
      selected: 0,
    },
    {
      id: 'q2',
      question: 'What is 2+2?',
      answers: [
        '4',
        '22',
        '2',
      ],
    },
  ];
  const onQuestionAnswered = jest.fn();
  const onComplete = jest.fn();

  beforeEach(() => {
    shallowComponent = shallow((
      <QuestionsList
        questions={questions}
        onQuestionAnswered={onQuestionAnswered}
        onComplete={onComplete}
      />
    ));
  });

  it('should render div with questions-list classname', () => {
    expect(shallowComponent.find('.questions-list')).toHaveLength(1);
  });

  it('should render Question component for each question', () => {
    shallowComponent.find(Question).forEach((question, index) => {
      expect(question.prop('answers')).toEqual(questions[index].answers);
      expect(question.prop('question')).toEqual(questions[index].question);
      expect(question.prop('selected')).toEqual(questions[index].selected);
      expect(question.prop('id')).toEqual(questions[index].id);
    });
  });

  describe('when a Question onSelect is called', () => {
    const selectedValue = 'value';
    beforeEach(() => {
      shallowComponent.find(Question).get(0).props.onSelect(selectedValue);
    });

    it('should call onQuestion answered with question id and answer index', () => {
      expect(onQuestionAnswered).toHaveBeenCalledTimes(1);
      expect(onQuestionAnswered).toHaveBeenCalledWith(questions[0].id, selectedValue);
    });
  });

  it('should render Button component', () => {
    expect(shallowComponent.find(Button).props()).toMatchObject({
      children: 'Submit',
      color: 'primary',
      tag: 'button',
    });
  });

  describe('when button is clicked', () => {
    beforeEach(() => {
      shallowComponent.find(Button).simulate('click');
    });

    it('should call onComplete', () => {
      expect(onComplete).toHaveBeenCalledTimes(1);
      expect(onComplete).toHaveBeenCalledWith();
    });
  });
});