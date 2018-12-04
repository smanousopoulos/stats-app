import * as actions from './actions';

const fetchQuestions = (category) => (dispatch, getState) => {
  const { session } = getState();

  return Promise.resolve();
};

export {
  fetchQuestions,
};
