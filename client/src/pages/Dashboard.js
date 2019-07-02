import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import io from 'socket.io-client';
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@material-ui/core';
import Gravatar from 'react-gravatar';
import AdminDashboard from 'components/AdminDashboard';
import DialogModal from 'components/DialogModal';
import Enrollments from 'components/Enrollments';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authenticated: true,
      modalOpen: false,
      question: null,
      socket: null,
      socketUrl: (process.env.NODE_ENV === 'production' ? "http://kubootcamphelper.herokuapp.com" : "http://localhost:3001"),
      userAccount: {},
    };

    this.onSignOut = this.onSignOut.bind(this);
    this.modalClose = this.modalClose.bind(this);
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
    
    this.receiveQuestion();
  }

  initSocket = () => {
    const socket = io(this.state.socketUrl)
    this.setState({ socket })
  }
 
   receiveQuestion = () => {
     const { socket } = this.state;
     socket.on('GET_QUESTION', (questionObject) => {
       const { question, id } = questionObject.question;
       console.log(question, ' - ', id, '-'.repeat(50))
      //  console.log(questionObject, '-'.repeat(50))
       this.setState({question, modalOpen: true})
     })
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
      <DialogModal 
        maxWidth={'sm'} 
        disableBackdropClick={true} 
        disableEscapeKeyDown={true} 
        fullWidth={true} 
        open={this.state.modalOpen} 
        onClose={this.modalClose}
        question={this.state.question} />
      </Box>
    );
  }

  modalClose(bool, val) {
    const { socket } = this.state;
    this.setState({modalOpen: bool})
    socket.emit('SEND_RESPONSE', val)
  }

  renderDashboards() {
    if (this.state.userAccount && this.state.userAccount.isAdmin) {
      return (
        <AdminDashboard enrollments={this.state.userAccount.enrollments} socket={this.state.socket} />
      )
    }
    return this.renderEnrollments();
  }

  renderEnrollments() {
    if (this.state.userAccount.enrollments) {
      return (
        <Enrollments enrollments={this.state.userAccount.enrollments} openModal={this.openModal}/>
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
