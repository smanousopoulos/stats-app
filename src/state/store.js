import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import loggerMiddleware from 'redux-logger';
import * as reducers from './ducks';

function configureStore(initialState) {
  const rootReducer = combineReducers(reducers);

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      thunkMiddleware,
      promiseMiddleware(),
      loggerMiddleware,
    ),
  );
}
export default configureStore;