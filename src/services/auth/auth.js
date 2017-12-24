import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';

// constants
export const LOGIN = 'LOGIN';

// action creators
export const login = createAction(LOGIN);

// reducer
const initialState = {
  token: null,
  user: null
};

export default handleActions({}, initialState);

// selectors
export const authTokenSelector = state => state.auth.token;
export const loggedInSelector = createSelector(
  authTokenSelector,
  token => token !== null
);
