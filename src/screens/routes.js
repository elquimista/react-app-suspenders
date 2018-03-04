import { match, unmatched, authenticated } from 'utils/routing';
import Login from 'screens/Auth/Login';
import Dashboard from 'screens/Dashboard';
import NotFound from 'screens/NotFound';

match('/login', { to: Login });

authenticated().root({ to: Dashboard });

unmatched({ to: NotFound });

export { routes, getPrivateRoutes } from 'utils/routing';
