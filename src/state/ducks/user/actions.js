import * as types from './types';

const setUser = (userId) => ({
  type: types.SET_USER,
  payload: {
    userId
  },
});

const resetUser = () => ({
  type: types.RESET_USER,
});

export {
  setUser,
  resetUser,
};
