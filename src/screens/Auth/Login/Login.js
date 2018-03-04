import React from 'react';
import { redirectIfAlreadyLoggedIn } from 'utils/decorators';

@redirectIfAlreadyLoggedIn
export default class Login extends React.Component {
  render() {
    return pug`
      div
        p Login screen coming soon...
    `;
  }
}
