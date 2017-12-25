import {
  createWhitelistFilter,
  createBlacklistFilter
} from 'redux-persist-transform-filter';
import { routerReducer as router } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import general from './general';
import auth from './auth';

export default {
  router,
  form,
  general,
  auth
};

export const reduxPersistTransforms = [
  createWhitelistFilter('router', []),
  createWhitelistFilter('form', []),
  createBlacklistFilter('general', ['isBusy'])
];

