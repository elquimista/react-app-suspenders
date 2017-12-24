import { createLogic } from 'redux-logic';
import { push } from 'react-router-redux';
import { loggedInSelector } from './auth';

const privateRoutes = ['/'];

const routerAuthValidationLogic = createLogic({
  type: ['@@router/LOCATION_CHANGE', /^@@auth\//],
  validate({ getState, action }, allow, reject) {
    const isLoggedIn = loggedInSelector(getState());

    if (privateRoutes.includes(action.payload.pathname) && !isLoggedIn) {
      reject(push('/login'));
    } else if (isLoggedIn) {
      reject(push('/'));
    } else {
      allow(action);
    }
  }
});

export default [routerAuthValidationLogic];
