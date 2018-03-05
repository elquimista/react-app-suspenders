import { decreaseUiBlockerCount } from 'services/general';
import authLogics from './auth/auth-logics';

export function handleGenericLogics({ dispatch }) {
  return ({ name, op }) => {
    if (op === 'end' && /#\bblock-ui\b/.test(name)) {
      dispatch(decreaseUiBlockerCount());
    }
  };
}

export default [...authLogics];
