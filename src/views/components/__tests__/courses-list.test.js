import React from 'react';
import { shallow } from 'enzyme';
import { Nav, NavItem } from 'reactstrap';
import CoursesList from '../courses-list';

describe('Courses list', () => {
  let shallowComponent;

  const courses = [
    { id: 'course1', courseId: 'course1-id', name: 'Course 1' },
    { id: 'course2', courseId: 'course2-id', name: 'Course 2' },
  ];
  const activeId = 'course2';
  const onSelect = jest.fn();

  beforeEach(() => {
    shallowComponent = shallow(
      <CoursesList
        courses={courses}
        activeId={activeId}
        onSelect={onSelect}
      />
    );
  });

  it('should render div with courses-list classname', () => {
    expect(shallowComponent.find('.courses-list')).toHaveLength(1);
  });

  it('should render vertical Nav component', () => {
    expect(shallowComponent.find(Nav).prop('vertical')).toEqual(true);
  });

  it('should render NavItem for each of the provided courses', () => {
    expect(shallowComponent.find(NavItem)).toHaveLength(2);
    shallowComponent.find(NavItem).forEach((item, index) => {
      expect(item.prop('children').props).toMatchObject({
        className: 'course-link',
        children: courses[index].name,
        to: `/${courses[index].courseId}`,
      });
    });
  });
});