import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import registerServiceWorker from 'registerServiceWorker';
import store, { persistor } from 'store';
import Router from 'screens/_Router';

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router />
    </PersistGate>
  </Provider>
);

/* eslint-disable no-underscore-dangle */
if (
  process.env.NODE_ENV === 'production' &&
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__ &&
  Object.keys(window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers).length > 0
) {
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers = {};
}
/* eslint-enable */

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
