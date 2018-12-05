import React from 'react';
import { shallow } from 'enzyme';
import { Input, Form, Button } from 'reactstrap';
import NewSessionForm from '../new-session-form';
import difficulties from '../../../data/difficulties';

describe('New Session Form', () => {
  let shallowComponent;

  const questions = 5;
  const difficulty = 'hard';
  const onQuestionsChanged = jest.fn();
  const onDifficultyChanged = jest.fn();
  const onCreate = jest.fn();

  beforeEach(() => {
    shallowComponent = shallow((
      <NewSessionForm
        questions={questions}
        difficulty={difficulty}
        onQuestionsChanged={onQuestionsChanged}
        onDifficultyChanged={onDifficultyChanged}
        onCreate={onCreate}
      />
    ));
  });

  it('should render Form with new-session-form classname', () => {
    expect(shallowComponent.find(Form).prop('className')).toEqual('new-session-form');
  });

  it('should render number input for questions', () => {
    expect(shallowComponent.find(Input).get(0).props).toMatchObject({
      id: 'questions',
      type: 'number',
      min: '0',
      step: '1',
      name: 'questions',
      placeholder: 'Number of questions',
      value: 5,
    });
  });

  it('should render select input for difficulty', () => {
    expect(shallowComponent.find(Input).get(1).props).toMatchObject({
      id: 'difficulty',
      type: 'select',
      name: 'difficulty',
      value: 'hard'
    });
  });

  it('should render select input with expected difficulties', () => {
    const options = shallowComponent.find(Input).get(1).props.children;
    expect(options.length).toEqual(difficulties.length);
    options.forEach((option, index) => {
      expect(option.props.children).toEqual(difficulties[index]);
    });
  });

  it('should render submit button', () => {
    expect(shallowComponent.find(Button).props()).toMatchObject({
      color: 'primary',
      tag: 'button',
      children: 'Create',
    });
  });

  describe('when number input is changed', () => {
    beforeEach(() => {
      shallowComponent.find(Input).get(0).props.onChange({ target: { value: '0' }});
      // TODO: Find a way to test by simulating change event
      //shallowComponent.find(Input).get(0).simulate('change', { target: { value: 'easy' }});
    });

    it('should call onQuestionsChanged', () => {
      expect(onQuestionsChanged).toHaveBeenCalledTimes(1);
      expect(onQuestionsChanged).toHaveBeenCalledWith('0');
    });
  });

  describe('when number input is changed with undefined', () => {
    beforeEach(() => {
      shallowComponent.find(Input).get(0).props.onChange({ target: { value: undefined }});
    });

    it('should call onQuestionsChanged', () => {
      expect(onQuestionsChanged).toHaveBeenCalledTimes(1);
      expect(onQuestionsChanged).toHaveBeenCalledWith(0);
    });
  });

  describe('when select input is changed', () => {
    beforeEach(() => {
      shallowComponent.find(Input).get(1).props.onChange({ target: { value: 'easy' }});
    });

    it('should call onDifficultyChanged', () => {
      expect(onDifficultyChanged).toHaveBeenCalledTimes(1);
      expect(onDifficultyChanged).toHaveBeenCalledWith('easy');
    });
  });

  describe('when submit button is clicked', () => {
    beforeEach(() => {
      shallowComponent.find(Button).simulate('click');
    });

    it('should call onCreate', () => {
      expect(onCreate).toHaveBeenCalledTimes(1);
      expect(onCreate).toHaveBeenCalledWith();
    });
  });
});