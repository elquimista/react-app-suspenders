import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import { history } from 'store';
import { routes } from 'screens/routes';

export default function Router() {
  let path;
  let component;

  return pug`
    ConnectedRouter(history=history)
      div
        Switch
          each route in routes
            - ({ path, component } = route);
            Route(key=path || '' exact=true path=path component=component)
  `;
}
