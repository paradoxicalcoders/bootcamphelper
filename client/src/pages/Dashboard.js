import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@material-ui/core';
import Gravatar from 'react-gravatar';
import AdminDashboard from 'components/AdminDashboard';
import Enrollments from 'components/Enrollments';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authenticated: true,
      userAccount: {},
    };

    this.onSignOut = this.onSignOut.bind(this);
  }

  componentDidMount() {
    const userAccount = JSON.parse(window.sessionStorage.getItem('userAccount'));
    const authenticated = userAccount && userAccount.email ? true : false;
    this.setState({
      userAccount,
      authenticated,
    });
  }

  render() {
    console.log(this.state.userAccount);
    if (!this.state.authenticated) {
      return <Redirect to='/' />;
    }

    return (
      <Box>
        <AppBar position="fixed" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
              Helper
            </Typography>
            {this.renderGravatar()}
            <Button
              color="inherit"
              onClick={this.onSignOut}
            >
              Sign Out
            </Button>
          </Toolbar>
        </AppBar>
        <Container>
          <Box pt={10}>
          { this.renderDashboards()}
          </Box>
        </Container>
      </Box>
    );
  }

  renderDashboards() {
    if (this.state.userAccount && this.state.userAccount.isAdmin) {
      return (
        <AdminDashboard enrollments={this.state.userAccount.enrollments} />
      )
    }
    return this.renderEnrollments();
  }

  renderEnrollments() {
    if (this.state.userAccount.enrollments) {
      return (
        <Enrollments enrollments={this.state.userAccount.enrollments} />
      )
    }
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
