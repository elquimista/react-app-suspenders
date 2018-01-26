import { createAction, handleActions } from 'redux-actions';

// constants
export const DEC_UI_BLOCKER_COUNT = 'DEC_UI_BLOCKER_COUNT';

// action creators
export const decreaseUiBlockerCount = createAction(DEC_UI_BLOCKER_COUNT);

// reducer
const initialState = {
  uiBlockerCount: 0
};
const reducer = handleActions(
  {
    [DEC_UI_BLOCKER_COUNT]: state => ({
      ...state,
      uiBlockerCount: Math.max(state.uiBlockerCount - 1, 0)
    })
  },
  initialState
);

export default function(state = initialState, action) {
  if (/#\bblock-ui\b/.test(action.type)) {
    return { ...state, uiBlockerCount: state.uiBlockerCount + 1 };
  }
  return reducer(state, action);
}

// selectors
export const busyStateSelector = state => state.general.uiBlockerCount > 0;
