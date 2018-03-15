import { createStructuredSelector } from 'reselect';
import { push } from 'react-router-redux';
import {
  increaseUiBlockerCount,
  decreaseUiBlockerCount
} from 'services/general';
import { loggedInSelector } from 'services/auth';
import { createMethodDecorator } from './';

/* eslint-disable func-names, no-param-reassign */

const createThunkDecorator = createHot =>
  createMethodDecorator(
    method =>
      function (payload) {
        const thunk = method.apply(this, [payload]);
        return (dispatch, getState) => createHot(dispatch, getState, thunk);
      }
  );

export function connectThunk(selectors) {
  const mapStateToProps = createStructuredSelector(selectors);
  return createThunkDecorator((dispatch, getState, thunk) =>
    thunk(dispatch, getState, mapStateToProps(getState()))
  );
}

export const blockUI = createThunkDecorator(
  async (dispatch, getState, thunk) => {
    try {
      dispatch(increaseUiBlockerCount());
      await thunk(dispatch, getState);
    } finally {
      dispatch(decreaseUiBlockerCount());
    }
  }
);

export const requiresAuth = createThunkDecorator(
  async (dispatch, getState, thunk) => {
    if (!loggedInSelector(getState())) {
      dispatch(push('/login'));
    } else {
      await thunk(dispatch, getState);
    }
  }
);
