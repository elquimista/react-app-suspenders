import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import { history } from 'store';
import { scopes, routes } from 'screens/routes';

export default function Router() {
  let Module;
  let moduleRoutes;
  let path;
  let component;

  return pug`
    ConnectedRouter(history=history)
      div
        each scope in scopes
          - ({ module: Module, routes: moduleRoutes } = scope);
          Module(key=Module.name)
            each route in moduleRoutes
              - ({ path, component } = route);
              Route(key=path exact=true path=path component=component)
        Switch
          each route in routes
            - ({ path, component } = route);
            Route(key=path || '' exact=true path=path component=component)
  `;
}
