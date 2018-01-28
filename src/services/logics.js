import { decreaseUiBlockerCount } from 'services/general';
import { logics as authLogics } from './auth';

export function handleGenericLogics({ dispatch }) {
  return ({ name, op }) => {
    if (op === 'end' && /#\bblock-ui\b/.test(name)) {
      dispatch(decreaseUiBlockerCount());
    }
  };
}

export default [...authLogics];
