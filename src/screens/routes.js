import { unmatched, scope, authenticated } from 'utils/routing';
import Dashboard from 'screens/Dashboard';
import Auth from 'screens/Auth';
import Login from 'screens/Auth/Login';
import NotFound from 'screens/NotFound';

scope({ module: Auth }).match('/login', { to: Login });

authenticated().root({ to: Dashboard });

unmatched({ to: NotFound });

export { routes, scopes, getPrivateRoutes } from 'utils/routing';
