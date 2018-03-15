import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import createHistory from 'history/createBrowserHistory';
import routerAuthMiddleware from 'services/auth/router-auth-middleware';
import reducers, { reduxPersistTransforms } from 'services/reducers';

const history = createHistory();
const enhancers = [
  applyMiddleware(
    routerAuthMiddleware,
    thunkMiddleware,
    routerMiddleware(history)
  )
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
  transforms: reduxPersistTransforms
};
const reducer = persistCombineReducers(persistConfig, reducers);
const store = createStore(reducer, compose(...enhancers));
const persistor = persistStore(store);

export { history, persistor };
export default store;
