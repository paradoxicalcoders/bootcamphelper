import React from 'react';
import { Route } from 'react-router-dom';

class DefaultLayout extends React.Component {

  render() {
    const {
      component: Component,
      onSignIn,
      authenticated,
      ...rest
    } = this.props;

    return (
      <Route {...rest} render={matchProps => (
        <Component onSignIn={onSignIn} {...matchProps} />
      )} />
    );
  }
};

export default DefaultLayout;