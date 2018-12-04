import React from 'react';
import PropTypes from 'prop-types';
import NewSessionPrompt from '../components/new-session-prompt';
import CourseAggregateDisplay from '../components/course-aggregate';

function onStartClick(props) {
  const courseId = props.match.params.courseId;
  props.history.push(`/${courseId}/new`);
}

const aggregate = {
  totalModulesStudied: 5,
  averageScore: 4.2,
  timeStudied: 5000
};

const CoursePage = (props) => {
  return (
    <div>
      {
        !props.match.params.courseId ? (
          <h3>Start by selecting a course on the menu</h3>
        ) : (
          <div>
            <NewSessionPrompt
              onClick={() => onStartClick(props)}
            />

            <div>
              <CourseAggregateDisplay
                values={aggregate}
              />
            </div>
          </div>
        )
      }
    </div>
  );
};

CoursePage.propTypes = {
  match: PropTypes.object,
};

export default CoursePage;
