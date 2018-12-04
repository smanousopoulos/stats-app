import React from 'react';
import { shallow } from 'enzyme';
import { Input, Label } from 'reactstrap';
import Question from '../question';

describe('Question', () => {
  let shallowComponent;
  const question = 'What is 1+1?';
  const answers = [
    '2',
    '11',
    '1',
  ];
  const selected = 0;
  const onSelect = jest.fn();

  beforeEach(() => {
    shallowComponent = shallow((
      <Question
        question={question}
        answers={answers}
        selected={selected}
        onSelect={onSelect}
      />
    ));
  });

  it('should render div with question classname', () => {
    expect(shallowComponent.find('.question')).toHaveLength(1);
  });

  it('should render h3 tag with question', () => {
    expect(shallowComponent.find('h3').props()).toEqual({
      children: question,
    });
  });

  it('should render a label component containing the answer text for every answer provided', () => {
    expect(shallowComponent.find(Label)).toHaveLength(3);
    expect(shallowComponent.find(Label).forEach((label, index) => {
      expect(label.prop('children')).toContain(answers[index]);
    }));
  });

  it('should render input components with expected props', () => {
    expect(shallowComponent.find(Input)).toHaveLength(3);
    shallowComponent.find(Input).forEach((input, index) => {
      expect(input.props()).toEqual({
        type: 'radio',
        onChange: expect.any(Function),
        name: answers[index],
        value: index,
        checked: index === selected,
      });
    });
  });

  describe('when onChange is called', () => {
    beforeEach(() => {
      shallowComponent.find(Input).get(0).props.onChange({ target: { value: 'value' }});
    });

    it('should call onSelect with changed value', () => {
      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(onSelect).toHaveBeenCalledWith('value');
    });
  });
});