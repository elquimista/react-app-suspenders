import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';

// constants
export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';

// action creators
export const setAuthToken = createAction(SET_AUTH_TOKEN);

// reducer
const initialState = {
  token: null,
  user: null
};
const reducer = {
  [SET_AUTH_TOKEN]: (state, { payload }) => ({
    ...state,
    token: payload
  })
};
export default handleActions(reducer, initialState);

// selectors
export const authTokenSelector = state => state.auth.token;
export const loggedInSelector = createSelector(
  authTokenSelector,
  token => token !== null
);
