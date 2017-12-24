import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createLogicMiddleware } from 'redux-logic';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { createWhitelistFilter } from 'redux-persist-transform-filter';
import storage from 'redux-persist/es/storage';
import createHistory from 'history/createBrowserHistory';
import reducers from 'services/reducers';
import logics from 'services/logics';

const history = createHistory();
const enhancers = [
  applyMiddleware(routerMiddleware(history), createLogicMiddleware(logics))
];

/* eslint-disable no-underscore-dangle */
if (
  process.env.NODE_ENV === 'development' &&
  window.__REDUX_DEVTOOLS_EXTENSION__
) {
  enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}
/* eslint-enable */

const persistConfig = {
  storage,
  key: 'root',
  transforms: [
    createWhitelistFilter('router', []),
    createWhitelistFilter('form', [])
  ]
};
const reducer = persistCombineReducers(persistConfig, reducers);
const store = createStore(reducer, compose(...enhancers));
const persistor = persistStore(store);

export { history, persistor };
export default store;
