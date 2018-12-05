import * as types from './types';

const startRequest = () => ({
  type: types.START_REQUEST,
});

const endRequest = () => ({
  type: types.END_REQUEST,
});

export {
  startRequest,
  endRequest,
};
