import { createLogic } from 'redux-logic';
import { push } from 'react-router-redux';
import { loggedInSelector } from './auth';

const privateRoutes = ['/'];
const routerAuthValidationLogic = createLogic({
  type: '@@router/LOCATION_CHANGE',
  validate({ getState, action }, allow, reject) {
    const isLoggedIn = loggedInSelector(getState());
    const isPrivateRoute = privateRoutes.includes(action.payload.pathname);

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

export default [
  routerAuthValidationLogic,
  actionAuthValidationLogic
];
