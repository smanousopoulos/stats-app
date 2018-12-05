import * as actions from './actions';
import uuidv4 from 'uuid/v4';

const setUserInitial = () => (dispatch, getState) => {
  const { user } = getState();
  const { userId } = user;

  if (!userId) {
    dispatch(actions.setUser(uuidv4()));
  }
};

export {
  setUserInitial,
};
