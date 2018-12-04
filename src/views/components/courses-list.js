import React from 'react';
import PropTypes from 'prop-types';

const CoursesList = () => {
  return <div />;
};

CoursesList.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string
    })
  ).isRequired,
  onSelect: PropTypes.func,
};

export default CoursesList;