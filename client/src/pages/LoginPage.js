import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './../index.css';
import { Box, Button, Card, CardContent, CardHeader, CircularProgress, TextField } from '@material-ui/core';
import LoginPageCardHeader from './../components/LoginPageCardHeader.js';
import axios from 'axios';

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      authenticated: false,
      isLoading: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
                  { this.renderLoginButtonText() }
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>
    );
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
    this.setState({[event.target.name]: event.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();

    this.setState({
      isLoading: true,
    });

    try {
      const response = await axios.post('http://localhost:3001/api/v1/auth/login', {
        email: this.state.email,
        password: this.state.password,
      });
      console.log(response);
      if (response.data && response.data.userAccount) {
        const { userAccount, enrollments } = response.data
        window.sessionStorage.setItem('userAccount', JSON.stringify(userAccount));
        window.sessionStorage.setItem('enrollments', JSON.stringify(enrollments));
        this.setState({
          authenticated: true,
          isLoading: false,
        });
      }
    } catch (err) {
      console.log(err);
      this.setState({
        isLoading: false,
      });
    }
  }
}

export default LoginPage;
