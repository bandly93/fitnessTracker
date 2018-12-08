import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import view from './viewModule.js';
import database from './databaseModule.js';
import auth from './authModule.js';
import flash from './flashModule.js';

const reducer = combineReducers({
  view,
	database,
	auth,
	flash,
});

export default function configureStore(preloadedState) {
  return createStore(
    reducer,
    preloadedState,
    compose(
      applyMiddleware(thunk),
      typeof window !== 'undefined' &&
				window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    ),
  );
}
