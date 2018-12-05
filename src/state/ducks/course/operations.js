import * as actions from './actions';
import * as statsService from '../../../services/stats-service';
import { commonActions } from '../common';

const fetchCourseAggregate = (categoryId) => (dispatch, getState) => { // eslint-disable-line no-unused-vars
  const { user, course } = getState();
  const { courses } = course;
  const { userId } = user;

  dispatch(commonActions.startRequest());

  const matchingCourse = courses.find(course => course.id === categoryId);
  const courseId = matchingCourse && matchingCourse.courseId;

  return statsService.fetchCourseAggregate(userId, courseId)
    .then((response) => {
      dispatch(commonActions.endRequest());
      dispatch(actions.setCourseAggregate(courseId, response));
    })
    .catch((error) => { // eslint-disable-line no-unused-vars
      // TODO: handle error
      console.error(error);
      dispatch(commonActions.endRequest());
    });
};


export {
  fetchCourseAggregate,
};
