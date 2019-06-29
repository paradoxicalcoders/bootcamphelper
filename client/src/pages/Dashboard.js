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
<<<<<<< HEAD
=======
      socketUrl: (process.env.NODE_ENV === 'production' ? "http://kubootcamphelper.herokuapp.com" : "http://localhost:3001"),
      socket: null,
      announcements: [],
>>>>>>> 858bb88cc7c77d181600570a2868054968d4afb5
    };

    console.log(this.state.socketUrl, " - STATE SOCKET URL");

    this.onSignOut = this.onSignOut.bind(this);

  }

  componentWillMount() {
    this.initSocket();
  }

  componentDidMount() {
    const userAccount = JSON.parse(window.sessionStorage.getItem('userAccount'));
    const authenticated = userAccount && userAccount.email ? true : false;
    this.setState({
      userAccount,
      authenticated,
    });
    this.emitUser(userAccount);
    
    this.retrieveAnnouncement();
  }

  initSocket = () => {
    // const socketUrl = 'http://localhost:3001/'
    const socket = io(this.state.socketUrl)
    this.setState({ socket })
  }

  emitUser = (userAccount) => {
    const { socket } = this.state
    socket.emit('USER_CONNECTED', userAccount)
  }

  sendAnnouncement = () => {
    const {socket} = this.state;
    socket.emit('ANNOUNCEMENT', 'TESTING ANNOUNCEMENT');
   }
 
   retrieveAnnouncement = () => {
     const {socket} = this.state;
     let announcements = [...this.state.announcements];
     socket.on('GET_ANNOUNCEMENT', (announcement) => {
       announcements.push(announcement)
       this.setState({announcements})
     })
   }

  render() {
    console.log(this.state.userAccount);
    if (!this.state.authenticated) {
      return <Redirect to='/' />;
    }

    return (
      <div>
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
          {this.renderEnrollments()}
        </Box>
        <br />
        {/* {this.renderAnnouncement()} */}
        {(this.state.announcements ? this.state.announcements.map(announcement => <div key={announcement}><p>{announcement}</p></div>) : false)}
        <br />
        {(this.state.userAccount.isAdmin ? <Button onClick={this.sendAnnouncement} color="inherit">Send announcement</Button> : false )}
      </div>
    );
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

  // renderAnnouncement() {
  //   if (this.state.announcements.length > 0) )
  // }

  onSignOut() {
    window.sessionStorage.clear();
    this.setState({
      authenticated: false,
    })
  }
}

export default Dashboard;
