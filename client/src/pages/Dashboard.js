import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import io from 'socket.io-client';
import { AppBar, Box, Button, Toolbar, Typography } from '@material-ui/core';
import Gravatar from 'react-gravatar';
import Enrollments from 'components/Enrollments'

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authenticated: true,
      userAccount: {},
      enrollments: [],
      socketUrl: null,
      socket: null,
    };

    this.onSignOut = this.onSignOut.bind(this);
  }
  
  componentWillMount() {
    if (process.env.NODE_ENV === 'production') {
      this.setState({socketUrl: "http://kubootcamphelper.herokuapp.com"})
    } else {
      this.setState({socketUrl: "http://localhost:3001"})
    }
    this.initSocket()
  }

  componentDidMount() {
    const userAccount = JSON.parse(window.sessionStorage.getItem('userAccount'));
    const enrollments = JSON.parse(window.sessionStorage.getItem('enrollments'));
    const authenticated = userAccount && enrollments ? true : false;
    this.setState({
      userAccount,
      enrollments,
      authenticated
    });
    this.emitUser(userAccount);
  }

  initSocket = () => {
    const socketUrl = 'http://localhost:3001/'
    const socket = io(socketUrl)
    this.setState({socket})
  }
  
  emitUser = (userAccount) => {
    const { socket } = this.state
    socket.emit('USER_CONNECTED', userAccount)
  }

  render() {
    console.log(this.state.userAccount);
    console.log(this.state.enrollments);
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
        <Enrollments enrollments={this.state.enrollments} />
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
