import * as types from './types';

const initialState = {
  userId: null,
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

    default:
      return state;
  }
};

export default userReducer;
