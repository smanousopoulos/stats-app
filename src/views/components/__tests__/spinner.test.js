import React from 'react';
import { shallow } from 'enzyme';
import Spinner from '../spinner';

describe('Spinner', () => {
  let shallowComponent;

  describe('when not loading', () => {
    const loading = false;

    beforeEach(() => {
      shallowComponent = shallow((
        <Spinner
          loading={loading}
        />
      ));
    });

    it('should not render anything', () => {
      expect(shallowComponent.find('.spinner')).toHaveLength(0);
    });
  });

  describe('when loading', () => {
    const loading = true;

    beforeEach(() => {
      shallowComponent = shallow((
        <Spinner
          loading={loading}
        />
      ));
    });

    it('should render spinner', () => {
      expect(shallowComponent.find('.spinner')).toHaveLength(1);
    });
  });
});