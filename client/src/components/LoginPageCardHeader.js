import React, { Component } from 'react';
import { Box } from '@material-ui/core';

class LoginPageCardHeader extends Component {
  render() {
    return (
      <Box
        align="center"
      >
        <p>Login with your password for</p>
        <img src="/img/bcs-logo-solid.svg" alt="Bootcamp Spot Credentials" height="20" />
      </Box>
    );
  }
}

export default LoginPageCardHeader;
