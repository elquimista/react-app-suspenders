import { push } from 'react-router-redux';
import { getPrivateRoutes } from 'screens/routes';
import { loggedInSelector } from 'services/auth';

const privateRoutes = getPrivateRoutes();

export default function routerAuthMiddleware({ getState }) {
  return next => action => {
    if (action.type === '@@router/LOCATION_CHANGE') {
      const isLoggedIn = loggedInSelector(getState());
      const isPrivateRoute = privateRoutes.includes(action.payload.pathname);
      if (isPrivateRoute && !isLoggedIn) {
        return next(push('/login'));
      } else if (!isPrivateRoute && isLoggedIn) {
        return next(push('/'));
      }
    }
    return next(action);
  };
}
