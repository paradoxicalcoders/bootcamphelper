import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import DialogModal from 'components/DialogModal';

import Appbar from 'components/Appbar';
import Drawer from 'components/Drawer';

class AuthenticatedLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      question: null,
      socket: null,
      socketUrl: (process.env.NODE_ENV === 'production' ? "http://kubootcamphelper.herokuapp.com" : "http://localhost:3001"),
      mobileOpen: false,
    };

    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.modalClose = this.modalClose.bind(this);
  }
  
  componentWillMount() {
    console.log(this.props.userAccount, 'USER_ACCOUNT');
    this.emitUser(this.props.userAccount);
    this.receiveQuestion();
  }

  emitUser = (userAccount) => {
    const { socket } = this.props;
    socket.emit('SEND_USER_INFO', userAccount)
  }

  receiveQuestion = () => {
    const { socket } = this.props;
    socket.on('GET_QUESTION', (question) => {
      this.setState({ question, modalOpen: true })
    })
  }

  setMobileOpen(bool) {
    this.setState({
      mobileOpen: bool,
    });
  }

  handleDrawerToggle() {
    this.setMobileOpen(!this.state.mobileOpen);
  }

  modalClose(bool, val) {
    const { socket } = this.props;
    this.setState({ modalOpen: bool })
    socket.emit('SEND_RESPONSE', val)
  }

  render() {
    // this.emitUser(this.props.userAccount);
    if (!this.props.authenticated) {
      return <Redirect to='/' />;
    }

    const {
      component: Component,
      onSignOut,
      userAccount,
      ...rest
    } = this.props;

    return (
      <Route {...rest} render={matchProps => (
        <div style={{display: 'flex'}}>
          <CssBaseline />
          <Appbar 
            handleDrawerToggle={this.handleDrawerToggle}
            email={userAccount && userAccount.email}
            onSignOut={onSignOut}
          />
          <Drawer 
            handleDrawerToggle={this.handleDrawerToggle}
            mobileOpen={this.state.mobileOpen}
          />
          <main style={{flexGrow: 1, backgroundColor: '#efefef'}}>
            <Component userAccount={userAccount} socket={this.props.socket} {...matchProps} />
          </main>
          <DialogModal
            maxWidth={'sm'}
            disableBackdropClick={true}
            disableEscapeKeyDown={true}
            fullWidth={true}
            open={this.state.modalOpen}
            onClose={this.modalClose}
            question={this.state.question}
          />
        </div>
      )} />
    );
  }
};

export default AuthenticatedLayout;