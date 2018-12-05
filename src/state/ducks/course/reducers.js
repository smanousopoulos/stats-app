import * as types from './types';
import { default as staticCourses } from '../../../data/courses';

const initialState = {
  courses: staticCourses,
  aggregate: null,
};

const courseReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.SET_COURSE_AGGREGATE:
      return {
        ...state,
        aggregate: action.payload.aggregate,
      };

    default:
      return state;
  }
};

export default courseReducer;
