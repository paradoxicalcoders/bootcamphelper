import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { AppBar, Box, Button, Toolbar, Typography } from '@material-ui/core';
import Gravatar from 'react-gravatar';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authenticated: true,
      userAccount: {},
      enrollments: [],
    };

    this.onSignOut = this.onSignOut.bind(this);
  }

  componentDidMount() {
    const userAccount = JSON.parse(window.sessionStorage.getItem('userAccount'));
    const enrollments = JSON.parse(window.sessionStorage.getItem('enrollments'));
    const authenticated = userAccount && enrollments ? true : false;
    this.setState({
      userAccount,
      enrollments,
      authenticated,
    });
  }

  render() {
    console.log(this.state.userAccount);
    console.log(this.state.enrollments);
    if (!this.state.authenticated) {
      return <Redirect to='/' />;
    }

    return (
      <Box>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit" style={{flexGrow: 1}}>
              Dashboard
            </Typography>
            { this.renderGravatar() }
            <Button
              color="inherit"
              onClick={this.onSignOut}
            >
              Sign Out
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }

  renderGravatar() {
    if (this.state.userAccount) {
      const email = this.state.userAccount.email ? this.state.userAccount.email : 'blah@blah.com';
      return (
        <Box pr={1}>
          <Gravatar email={email} size={35} />
        </Box>
      );
    }
  }

  onSignOut() {
    window.sessionStorage.clear();
    this.setState({
      authenticated: false,
    })
  }
}

export default Dashboard;
