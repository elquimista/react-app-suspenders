import { match, unmatched, scope, authenticated } from 'utils/routing';
import Dashboard from 'screens/Dashboard';
import Login from 'screens/Auth/Login';

scope({ module: Auth })
  .match('/login', { to: Login });

authenticated()
  .root({ to: Dashboard });

export { routes, scopes, getPrivateRoutes } from 'utils/routing';
