import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import { history } from 'store';
import { scopes, routes } from 'screens/routes';

export default function Router() {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        {scopes.map(scope => (
          <scope.module key={scope.module.name}>
            {scope.routes.map(({ path, component }) => (
              <Route key={path} exact path={path} component={component} />
            ))}
          </scope.module>
        ))}
        {routes.map(({ path, component }) => (
          <Route key={path || ''} exact path={path} component={component} />
        ))}
      </Switch>
    </ConnectedRouter>
  );
}
