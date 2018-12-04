import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

const noop = function (state = {}, action) {
  switch (action.type) {
    default:
      return state;
  }
};

const AppReducer = combineReducers({
  noop,
});

const createAppStore = () => {
  return createStore(AppReducer, applyMiddleware(thunk, promiseMiddleware()));
};

export default createAppStore;