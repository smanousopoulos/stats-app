import React from 'react';
import PropTypes from 'prop-types';

const CourseAggregateDisplay = () => {
  return <div />;
};

CourseAggregateDisplay.propTypes = {
  values: PropTypes.shape({
    totalModulesStudied: PropTypes.number,
    averageScore: PropTypes.number,
    timeStudied: PropTypes.number,
  }),
};

export default CourseAggregateDisplay;