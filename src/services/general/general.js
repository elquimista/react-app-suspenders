import { createAction, handleActions } from 'redux-actions';

// constants
export const CLEAR_BUSY_STATE = 'CLEAR_BUSY_STATE';

// action creators
export const clearBusyState = createAction(CLEAR_BUSY_STATE);

// reducer
const initialState = {
  isBusy: false
};
const reducer = handleActions(
  {
    [CLEAR_BUSY_STATE]: state => ({
      ...state,
      isBusy: false
    })
  },
  initialState
);

export default function(state = initialState, action) {
  if (/#\bblock-ui\b/.test(action.type)) {
    return { ...state, isBusy: true };
  }
  return reducer(state, action);
}

// selectors
export const busyStateSelector = state => state.general.isBusy;
