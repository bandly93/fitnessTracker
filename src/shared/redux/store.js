import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import view from './viewModule.js';
import database from './databaseModule.js';
import auth from './authModule.js';

const reducers = combineReducers({
  view,
	database,
	auth,
});

export default function configureStore(preloadedState) {
  return createStore(
    reducers,
    preloadedState,
    compose(
      applyMiddleware(thunk),
			/*
      typeof window !== 'undefined' &&
				window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
			*/
    ),
  );
}
