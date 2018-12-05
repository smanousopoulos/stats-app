import * as types from './types';

const initialState = {
  activeRequests: 0,
};

const commonReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.START_REQUEST:
      return {
        ...state,
        activeRequests: state.activeRequests + 1,
      };

    case types.END_REQUEST: {
      const afterRequest = state.activeRequests - 1;
      return {
        ...state,
        activeRequests: afterRequest >= 0 ? afterRequest : 0,
      };
    }

    default:
      return state;
  }
};

export default commonReducer;
