import React, { Component } from 'react';
import { Box, Button, Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import LoginPageCardHeader from './../components/LoginPageCardHeader.js';
import axios from 'axios';

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
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

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();
    console.log('Let\'s login baby!');

    try {
      const response = await axios.post('http://localhost:3001/api/v1/auth/login', {
        email: this.state.email,
        password: this.state.password,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
}

export default LoginPage;
