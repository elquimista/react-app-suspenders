import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Redirect } from 'react-router-dom';
import { loggedInSelector } from 'services/auth';

/* eslint-disable func-names, no-param-reassign */

const withAuth = connect(
  createStructuredSelector({ isLoggedIn: loggedInSelector })
);
export function redirectIfAlreadyLoggedIn(Target) {
  return withAuth(
    ({ isLoggedIn, ...props }) => pug`
      if isLoggedIn
        Redirect(to="/")
      else
        Target(...props)
    `
  );
}

export default { redirectIfAlreadyLoggedIn };
