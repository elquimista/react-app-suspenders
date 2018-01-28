import { createLogic } from 'redux-logic';
import { push } from 'react-router-redux';
import { getPrivateRoutes } from 'screens/routes';
import { loggedInSelector } from './auth';

const PRIVATE_ROUTES = getPrivateRoutes();
const routerAuthValidationLogic = createLogic({
  type: '@@router/LOCATION_CHANGE',
  validate({ getState, action }, allow, reject) {
    const isLoggedIn = loggedInSelector(getState());
    const isPrivateRoute = PRIVATE_ROUTES.includes(action.payload.pathname);

    if (isPrivateRoute && !isLoggedIn) {
      reject(push('/login'));
    } else if (!isPrivateRoute && isLoggedIn) {
      reject(push('/'));
    } else {
      allow(action);
    }
  }
});

const actionAuthValidationLogic = createLogic({
  type: /#\bauth\b/,
  validate({ getState, action }, allow, reject) {
    const isLoggedIn = loggedInSelector(getState());
    if (isLoggedIn) {
      allow(action);
    } else {
      reject(push('/login'));
    }
  }
});

export default [routerAuthValidationLogic, actionAuthValidationLogic];
