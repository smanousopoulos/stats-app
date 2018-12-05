import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Nav, NavItem, NavLink } from 'reactstrap';

const CoursesList = (props) => {
  const { courses } = props;
  return (
    <div className="courses-list">
      <Nav tabs vertical>
        {
          courses.map(course => (
            <NavItem key={course.id}>
              <NavLink
                tag={Link}
                className="course-link"
                to={`/${course.courseId}`}
              >
                { course.name }
              </NavLink>
            </NavItem>
          ))
        }
      </Nav>
    </div>
  );
};

CoursesList.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      courseId: PropTypes.string,
      name: PropTypes.string
    })
  ).isRequired,
  onSelect: PropTypes.func,
};

export default CoursesList;