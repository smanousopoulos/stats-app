import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { timeConversion } from '../utils/time-utils';

const CourseAggregateDisplay = (props) => {
  const { values } = props;
  return values && (
    <div className="course-aggregate">
      <h3>Course statistics</h3>
      <ListGroup>
        <ListGroupItem>
          <b>Total modules:</b> { values.totalModulesStudied }
        </ListGroupItem>
        <ListGroupItem>
          <b>Average score:</b> { values.averageScore }
        </ListGroupItem>
        <ListGroupItem>
          <b>Time spent:</b> { timeConversion(values.timeStudied) }
        </ListGroupItem>
      </ListGroup>
    </div>
  ) || <div />;
};

CourseAggregateDisplay.propTypes = {
  values: PropTypes.shape({
    totalModulesStudied: PropTypes.number,
    averageScore: PropTypes.number,
    timeStudied: PropTypes.number,
  }),
};

export default CourseAggregateDisplay;