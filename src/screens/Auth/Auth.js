import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { loggedInSelector } from 'services/auth';

const mapStateToProps = createStructuredSelector({
  isLoggedIn: loggedInSelector
});

function withRedirect(Component) {
  return connect(mapStateToProps)(
    ({ isLoggedIn, ...props }) =>
      isLoggedIn ? <Redirect to="/" /> : <Component {...props} />
  );
}

export default function Auth({ children }) {
  return children.map(route => ({
    ...route,
    props: {
      ...route.props,
      component: withRedirect(route.props.component)
    }
  }));
}
