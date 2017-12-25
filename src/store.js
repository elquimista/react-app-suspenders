import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createLogicMiddleware } from 'redux-logic';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import createHistory from 'history/createBrowserHistory';
import reducers, { reduxPersistTransforms } from 'services/reducers';
import logics, { handleGenericLogics } from 'services/logics';

const history = createHistory();
const logicMiddleware = createLogicMiddleware(logics);
const enhancers = [applyMiddleware(logicMiddleware, routerMiddleware(history))];

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

logicMiddleware.monitor$.subscribe(handleGenericLogics(store));

export { history, persistor };
export default store;
