import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { rootReducer } from './reducers';

const middleware = [thunk];

/**
 * Push logger in development mode
 */
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

/**
 * App history
 */
export const history = createHistory({ basename: '' });

const preloadedState = {
  moduleStore: {
    userData: JSON.parse(window.localStorage.getItem('userData')),
    isLoggedIn: window.localStorage.getItem('userData') ? true : false
  }
};

/**
 * Create store with preloaded state
 */
export const store = createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(...middleware)
);
