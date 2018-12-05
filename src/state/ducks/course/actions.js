import * as types from './types';

const setCourseAggregate = (courseId, aggregate) => ({
  type: types.SET_COURSE_AGGREGATE,
  payload: {
    courseId,
    aggregate,
  },
});

export {
  setCourseAggregate,
};
