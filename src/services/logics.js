import { clearBusyState } from 'services/general';
import { logics as authLogics } from './auth';

export function handleGenericLogics({ dispatch }) {
  return function({ action, op }) {
    if (action && /#\bblock-ui\b/.test(action.type) && op === 'end') {
      dispatch(clearBusyState());
    }
  };
}

export default [...authLogics];
