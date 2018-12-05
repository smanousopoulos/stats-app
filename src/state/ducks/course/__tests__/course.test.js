import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../actions';
import * as operations from '../operations';
import * as types from '../types';
import { commonTypes } from '../../common'
import reducer from '../reducers';
import statsService from '../../../../services/stats-service';
import { default as staticCourses } from '../../../../data/courses';

jest.mock('../../../../services/stats-service', () => ({
  fetchCourseAggregate: jest.fn(),
}));

const dummyAggregate = {
  modules: 5,
  score: 3,
  time: 2,
};
const courseId = '2';

describe('Course actions', () => {
  describe('Set course aggregate', () => {
    const expectedAction = {
      type: types.SET_COURSE_AGGREGATE,
      payload: {
        courseId,
        aggregate: dummyAggregate,
      }
    };

    it('should create an action to set the course aggregate', () => {
      expect(actions.setCourseAggregate(courseId, dummyAggregate)).toEqual(expectedAction);
    });
  });
});

describe('Course reducer', () => {
  const initialState = {
    courses: staticCourses,
    aggregate: null,
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  describe('when handling SET_COURSE_AGGREGATE', () => {
    const setCourseAggregateAction = {
      type: types.SET_COURSE_AGGREGATE,
      payload: {
        aggregate: dummyAggregate,
      }
    };

    it('should update course aggregate', () => {
      expect(reducer(initialState, setCourseAggregateAction)).toEqual({
        ...initialState,
        aggregate: dummyAggregate,
      });
    });
  });
});

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Course operations', () => {
  describe('Fetch course aggregate', () => {
    describe('when fetch course aggregate service responds as expected', () => {

      beforeEach(() => {
        statsService.fetchCourseAggregate.mockImplementation(() => Promise.resolve((dummyAggregate)));
      });

      const category = '2';
      const store = mockStore({
        course: {
          courses: staticCourses
        },
        user: {
          userId: 'user-id'
        }
      });

      beforeEach(() => {
        return store.dispatch(operations.fetchCourseAggregate(category));
      });

      it('should dispatch SET_COURSE_AGGREGATE action with returned aggregate', () => {
        expect(store.getActions()).toEqual([
          {
            type: commonTypes.START_REQUEST,
          },
          {
            type: commonTypes.END_REQUEST,
          },
          {
            type: types.SET_COURSE_AGGREGATE,
            payload: {
              aggregate: dummyAggregate
            }
          },
        ]);
      });
    });

    describe('when opentdb service doesn\'t respond as expected', () => {
      beforeEach(() => {
        statsService.fetchCourseAggregate.mockImplementation(() => Promise.reject(({ message: 'Internal server error' })));
      });

      const category = '2';
      const store = mockStore({
        course: {
          courses: staticCourses
        },
        user: {
          userId: 'user-id'
        }
      });

      beforeEach(() => {
        return store.dispatch(operations.fetchCourseAggregate(category));
      });

      it('should only dispatch START_REQUEST, END_REQUEST actions', () => {
        expect(store.getActions()).toEqual([
          {
            type: commonTypes.START_REQUEST,
          },
          {
            type: commonTypes.END_REQUEST,
          },
        ]);
      });
    });
  });
});