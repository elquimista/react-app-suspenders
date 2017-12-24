import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';
import { history } from 'store';

import Dashboard from 'screens/Dashboard';
import Login from 'screens/Login';

export default function Router() {
  return (
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/login" component={Login} />
      </div>
    </ConnectedRouter>
  );
}
