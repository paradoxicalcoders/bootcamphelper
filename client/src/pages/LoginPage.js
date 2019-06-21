import React, { Component } from 'react';
import { Box, Button, Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import LoginPageCardHeader from './../components/LoginPageCardHeader.js';

class LoginPage extends Component {
  render() {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        p={4}
      >
        <Card maxwidth={360} width="90%">
          <CardHeader component={LoginPageCardHeader} />
          <CardContent>
            <form
              onSubmit={this.handleSubmit}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoFocus
                autoComplete="off"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('Let\'s login baby!');
  }
}

export default LoginPage;
