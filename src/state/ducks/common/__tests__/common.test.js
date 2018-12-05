import * as actions from '../actions';
import * as types from '../types';
import reducer from '../reducers';

describe('Common actions', () => {
  describe('Start request', () => {
    const expectedAction = {
      type: types.START_REQUEST,
    };

    it('should create an action to mark started request', () => {
      expect(actions.startRequest()).toEqual(expectedAction);
    });
  });

  describe('End request', () => {
    const expectedAction = {
      type: types.END_REQUEST,
    };

    it('should create an action to mark ended request', () => {
      expect(actions.endRequest()).toEqual(expectedAction);
    });
  });
});

describe('Common reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      activeRequests: 0,
    });
  });

  describe('should handle START_REQUEST', () => {
    const startRequestAction = {
      type: types.START_REQUEST,
    };

    const initialState = {
      activeRequests: 0,
    };

    it('should increase active requets by 1', () => {
      expect(reducer(initialState, startRequestAction)).toEqual({
        activeRequests: 1,
      });
    });
  });

  describe('should handle END_REQUEST', () => {
    const endRequestAction = {
      type: types.END_REQUEST,
    };

    describe('when active requests above 0', () => {
      const initialState = {
        activeRequests: 4,
      };

      it('should leave state unchanged', () => {
        expect(reducer(initialState, endRequestAction)).toEqual({
          activeRequests: 3
        });
      });
    });

    describe('when active requests are 0', () => {
      const initialState = {
        activeRequests: 0,
      };

      it('should leave state unchanged', () => {
        expect(reducer(initialState, endRequestAction)).toEqual({
          activeRequests: 0
        });
      });
    });
  });
});