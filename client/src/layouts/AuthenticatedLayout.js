import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

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
      mobileOpen: false,
    };

    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.modalClose = this.modalClose.bind(this);

    // this.receiveQuestion = this.receiveQuestion.bind(this);
    this.receiveQuestion();
  }

  // componentDidMount() {
  //   this.receiveQuestion();
  // }
  
  receiveQuestion = () => {
    const { socket } = this.props
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
      onSignOut,
      userAccount,
    } = this.props;

    return (
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
          {this.props.children}
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
    );
  }
};

export default AuthenticatedLayout;