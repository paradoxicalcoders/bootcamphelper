import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import 'index.css';
import { Box, Button, Card, CardContent, CardHeader, CircularProgress, Snackbar, TextField } from '@material-ui/core';
import LoginPageCardHeader from 'components/LoginPageCardHeader.js';
import axios from 'axios';

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      authenticated: false,
      isLoading: false,
      error: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }

  componentDidMount() {
    const userAccount = JSON.parse(window.sessionStorage.getItem('userAccount'));
    const enrollments = JSON.parse(window.sessionStorage.getItem('enrollments'));
    const authenticated = userAccount && enrollments ? true : false;
    this.setState({
      authenticated,
    });
  }

  render() {
    if (this.state.authenticated) {
      return <Redirect to='/dashboard' />;
    }

    return (
      <Box
        display="flex"
        justifyContent="center"
        pt={8}
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
                autoComplete="email"
                value={this.state.email} onChange={this.handleChange}
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
                value={this.state.password} onChange={this.handleChange}
              />
              <Box mt={1}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={this.state.isLoading}
                >
                  {this.renderLoginButtonText()}
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
        <Snackbar
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          open={!!this.state.error}
          onClose={this.closeSnackbar}
          message={this.state.error}
          variant="warning"
        />
      </Box>
    );
  }

  closeSnackbar() {
    this.setState({
      error: '',
    })
  }

  renderLoginButtonText() {
    if (this.state.isLoading) {
      return (
        <CircularProgress size={23} />
      );
    }
    return (
      <span>Sign In</span>
    );

  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();

    this.setState({
      isLoading: true,
    });

    try {
      const response = await axios.post('/api/v1/auth/login', {
        email: this.state.email,
        password: this.state.password,
      });
      if (response.data && response.data.email) {
        window.sessionStorage.setItem('userAccount', JSON.stringify(response.data));
        return this.setState({
          authenticated: true,
          isLoading: false,
        });
      }
      throw new Error('Houston, we have a problem');
    } catch (err) {
      let error = err.toString();
      if (error.indexOf('401') !== -1) {
        error = 'That password didn\'t work.';
      }
      this.setState({
        isLoading: false,
        error,
      });
    }
  }
}

export default LoginPage;
