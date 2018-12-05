import * as types from './types';

const initialState = {
  userId: null,
  isLoading: 0,
};

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.SET_USER:
      return {
        ...state,
        userId: action.payload.userId
      };

    case types.RESET_USER:
      return {
        ...state,
        userId: null
      };

    case types.START_REQUEST:
      return {
        ...state,
        isLoading: state.isLoading + 1,
      };

    case types.END_REQUEST: {
      const afterRequest = state.isLoading - 1;
      return {
        ...state,
        isLoading: afterRequest >= 0 ? afterRequest : 0,
      };
    }

    default:
      return state;
  }
};

export default userReducer;
