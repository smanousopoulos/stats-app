import React from 'react';
import { shallow } from 'enzyme';
import { ListGroup, ListGroupItem } from 'reactstrap';
import CourseAggregateDisplay from '../course-aggregate';
import { timeConversion } from '../../utils/time-utils';

jest.mock('../../utils/time-utils', () => ({
  timeConversion: jest.fn((val) => val),
}));

describe('Course aggregate', () => {
  let shallowComponent;

  describe('when not provided a values prop', () => {
    beforeEach(() => {
      shallowComponent = shallow(
        <CourseAggregateDisplay />
      );
    });

    it('should render empty div', () => {
      expect(shallowComponent.find('div')).toHaveLength(1);
      expect(shallowComponent.find('div').props()).toEqual({});
    });
  });

  describe('when provided a values prop', () => {
    const values = {
      totalModulesStudied: 5,
      averageScore: 2.4,
      timeStudied: 5000,
    };

    beforeEach(() => {
      shallowComponent = shallow((
        <CourseAggregateDisplay
          values={values}
        />
      ));
    });

    it('should render div with course-aggregate classname', () => {
      expect(shallowComponent.find('.course-aggregate')).toHaveLength(1);
    });

    it('should render h3 tag with title', () => {
      expect(shallowComponent.find('h3').prop('children')).toEqual('Course statistics');
    });

    it('should render list group component', () => {
      expect(shallowComponent.find(ListGroup)).toHaveLength(1);
    });

    it('should render three list group item components', () => {
      expect(shallowComponent.find(ListGroupItem)).toHaveLength(3);
    });

    it('should firstly render list group item with total modules studied', () => {
      expect(shallowComponent.find(ListGroupItem).get(0).props.children[0]).toEqual(<b>Total modules:</b>);
      expect(shallowComponent.find(ListGroupItem).get(0).props.children).toContain(values.totalModulesStudied);
    });

    it('should secondly render list group item with average score', () => {
      expect(shallowComponent.find(ListGroupItem).get(1).props.children[0]).toEqual(<b>Average score:</b>);
      expect(shallowComponent.find(ListGroupItem).get(1).props.children).toContain(values.averageScore);
    });

    it('should thirdly render list group item with formatted time studied', () => {
      expect(shallowComponent.find(ListGroupItem).get(2).props.children[0]).toEqual(<b>Time spent:</b>);
      expect(shallowComponent.find(ListGroupItem).get(2).props.children).toContain(values.timeStudied);
      expect(timeConversion).toHaveBeenCalledTimes(1);
      expect(timeConversion).toHaveBeenCalledWith(values.timeStudied);
    });
  });
});