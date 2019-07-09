import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AuthenticatedLayout from 'layouts/AuthenticatedLayout';

import LoginPage from 'pages/LoginPage';
import Dashboard from 'pages/Dashboard';
import Resources from 'pages/Resources';
import TagManager from 'pages/TagManager';

const socketUrl = process.env.NODE_ENV === 'production' ? "http://kubootcamphelper.herokuapp.com" : "http://localhost:3001";
const socket = require('socket.io-client')(socketUrl);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      userAccount: {},
      sessionChecked: false,
      socket: null,
    };

    this.onSignIn = this.onSignIn.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
  }

  componentDidMount() {
    this.checkSession();
  }

  checkSession() {
    // If a page is refreshed and state is cleared, check session storage for a user.
    if (this.authenticated) {
      return this.setState({
        sessionChecked: true,
      });
    }

    const userAccount = JSON.parse(window.sessionStorage.getItem('userAccount'));
    const authenticated = userAccount && userAccount.email ? true : false;
    this.setState({
      authenticated,
      userAccount,
      sessionChecked: true,
    });

    if (authenticated) {
      this.emitUser(userAccount);
      this.receiveQuestion();
    }
  }

  emitUser = (userAccount) => {
    console.log('emit user');
    console.log(socket);
    socket.emit('SEND_USER_INFO', userAccount)
  }

  receiveQuestion = () => {
    socket.on('GET_QUESTION', (question) => {
      //  const { question } = questionObject.question;
      //  console.log(questionObject, '-'.repeat(50))
      this.setState({ question, modalOpen: true })
    })
  }

  onSignIn(userAccount) {
    window.sessionStorage.setItem('userAccount', JSON.stringify(userAccount));
    this.setState({
      authenticated: true,
      userAccount,
      sessionChecked: true,
    });
    this.emitUser(userAccount);
    this.receiveQuestion();
  }

  onSignOut() {
    window.sessionStorage.clear();
    this.setState({
      authenticated: false,
      userAccount: {},
    });
  }

  render() {
    if (!this.state.sessionChecked) return null;

    return (
      <Router>
        <Switch>
          <Route
            exact path='/'
            render={(props) =>
              <LoginPage
                {...props}
                userAccount={this.state.userAccount}
                authenticated={this.state.authenticated}
                onSignIn={this.onSignIn}
              />}
          />
          <AuthenticatedLayout
            onSignOut={this.onSignOut}
            authenticated={this.state.authenticated}
            userAccount={this.state.userAccount}
            socket={socket}
          >
            <Switch>
              <Route
                exact path='/dashboard'
                render={(props) => <Dashboard {...props} userAccount={this.state.userAccount} socket={socket} />}
              />
              <Route
                exact path='/resources'
                render={(props) => <Resources {...props} />}
              />
              <Route
                exact path='/tag-manager'
                render={(props) => <TagManager {...props} />}
              />
            </Switch>
          </AuthenticatedLayout>
        </Switch>
      </Router>
    );
  }
}

export default App;