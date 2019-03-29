import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { rootReducer } from './reducers';

const middleware = [thunk];
middleware.push(createLogger());

export const history = createHistory({ basename: '' });

const preloadedState = {
  moduleStore: {
    userData: window.localStorage.getItem('userData'),
    isLoggedIn: window.localStorage.getItem('userData') ? true : false
  }
};

export const store = createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(...middleware)
);
