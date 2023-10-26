import { combineReducers, createStore, applyMiddleware } from 'redux';
import itemsReducer from './reducer';
import reducer from './reducer';
import localStorageMiddleware from './localStorageMiddleware';

const rootReducer = combineReducers({
  items: itemsReducer,
});

const store = createStore(reducer, rootReducer, applyMiddleware(localStorageMiddleware));

export default store;