import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
      questionObj: null,
      mobileOpen: false,
    };

    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.modalClose = this.modalClose.bind(this);

    const { socket } = this.props;
    socket.on('GET_QUESTION', (questionObj) => {
      console.log(questionObj)
      this.setState({ questionObj, modalOpen: true });
    });
    // this.receiveQuestion = this.receiveQuestion.bind(this);
    // this.receiveQuestion = () => {
    // };
    // this.receiveQuestion();
  }

  // componentDidMount() {
  //   this.receiveQuestion();
  // }

  setMobileOpen(bool) {
    this.setState({
      mobileOpen: bool,
    });
  }

  handleDrawerToggle() {
    this.setMobileOpen(!this.state.mobileOpen);
  }

  modalClose(bool, val) {
    const { socket, userAccount } = this.props;
    const { id: UserId } = userAccount;
    this.setState({ modalOpen: bool });
    socket.emit('SEND_RESPONSE', val);
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
      <div style={{ display: 'flex' }}>
        <CssBaseline />
        <Appbar
          handleDrawerToggle={this.handleDrawerToggle}
          email={userAccount && userAccount.email}
          onSignOut={onSignOut}
        />
        <Drawer
          handleDrawerToggle={this.handleDrawerToggle}
          mobileOpen={this.state.mobileOpen}
          isAdmin={!!(this.props.userAccount && this.props.userAccount.isAdmin)}
        />
        <main style={{ flexGrow: 1, backgroundColor: '#efefef' }}>
          {this.props.children}
        </main>
        <DialogModal
          maxWidth={'sm'}
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
          fullWidth={true}
          open={this.state.modalOpen}
          onClose={this.modalClose}
          question={(this.state.questionObj ? this.state.questionObj.title : '')}
        />
      </div>
    );
  }
}

AuthenticatedLayout.propTypes = {
  socket: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  onSignOut: PropTypes.func.isRequired,
  userAccount: PropTypes.object.isRequired,
  children: PropTypes.object,
};

export default AuthenticatedLayout;
