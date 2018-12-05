import * as actions from './actions';
import * as statsService from '../../../services/stats-service';
import { commonActions } from '../common';

const fetchCourseAggregate = (courseId) => (dispatch, getState) => { // eslint-disable-line no-unused-vars
  const { user } = getState();
  const { userId } = user;

  dispatch(commonActions.startRequest());

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
