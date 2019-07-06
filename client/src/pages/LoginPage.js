import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import 'index.css';

import Box from '@material-ui/core/Box';
import Button  from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField  from '@material-ui/core/TextField';

import LoginPageCardHeader from 'components/LoginPageCardHeader.js';
import Snackbar from 'components/Snackbar';

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: false,
      error: '',
      loginSuccess: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }

  render() {
    if (this.state.loginSuccess) {
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
          open={!!this.state.error}
          onClose={this.closeSnackbar}
          message={this.state.error}
          variant="error"
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
      console.log(response.data);
      if (response.data && response.data.email) {
        this.props.onSignIn(response.data);
        return this.setState({
          isLoading: false,
          loginSuccess: true,
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
