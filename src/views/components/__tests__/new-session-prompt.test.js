import React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'reactstrap';
import NewSessionPrompt from '../new-session-prompt';

describe('New Session Prompt', () => {
  let shallowComponent;
  const onClick = jest.fn();

  beforeEach(() => {
    shallowComponent = shallow((
      <NewSessionPrompt
        onClick={onClick}
      />
    ));
  });

  it('should render div with new-session-prompt classname', () => {
    expect(shallowComponent.find('.new-session-prompt')).toHaveLength(1);
  });

  it('should render h3 tag with title', () => {
    expect(shallowComponent.find('h3').prop('children')).toEqual('Ready for a new session?');
  });

  it('should render Button with expected static props', () => {
    expect(shallowComponent.find(Button).props()).toMatchObject({
      color: 'primary',
      children: 'Start',
      size: 'lg',
    });
  });

  it('should pass onClick to Button', () => {
    expect(shallowComponent.find(Button).prop('onClick')).toEqual(onClick);
  });
});