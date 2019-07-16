import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import axios from 'axios';

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

    this.receiveQuestion();
  }

  // componentDidMount() {
  //   this.receiveQuestion();
  // }

  receiveQuestion() {
    const { socket, userAccount } = this.props;
    if (!userAccount.isAdmin) {
      socket.on('GET_QUESTION', (questionObj) => {
        this.setState({ questionObj, modalOpen: true });
        const CourseId = userAccount.courses[0].id;
        const UserId = userAccount.id;
        socket.emit('GOT_QUESTION', { courseID: CourseId, userID: UserId, questionObj });
      });
    }
  }

  setMobileOpen(bool) {
    this.setState({
      mobileOpen: bool,
    });
  }

  handleDrawerToggle() {
    this.setMobileOpen(!this.state.mobileOpen);
  }

  async modalClose(bool, answer) {
    const { socket, userAccount } = this.props;
    const { question, QuestionId } = this.state.questionObj;
    const { id: UserId } = userAccount;
    try {
      const response = await axios.post('/api/v1/responses', {
        answer,
        QuestionId,
        UserId,
      });
      const { answer: resAnswer } = response.data;
      this.setState({ modalOpen: bool });
      socket.emit('SEND_RESPONSE', { resAnswer, question, UserId });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    // this.emitUser(this.props.userAccount);
    if (!this.props.authenticated) {
      return <Redirect to="/" />;
    }

    const { onSignOut, userAccount } = this.props;

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
        <main style={{ flexGrow: 1, backgroundColor: '#efefef' }}>{this.props.children}</main>
        <DialogModal
          maxWidth={'sm'}
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
          fullWidth={true}
          open={this.state.modalOpen}
          onClose={this.modalClose}
          question={this.state.questionObj ? this.state.questionObj.question : ''}
        />
      </div>
    );
  }
}

AuthenticatedLayout.propTypes = {
  socket: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  onSignOut: PropTypes.func.isRequired,
  userAccount: PropTypes.object,
  children: PropTypes.object,
};

export default AuthenticatedLayout;
