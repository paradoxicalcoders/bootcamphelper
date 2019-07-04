import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import DefaultLayout from 'layouts/DefaultLayout';
import AuthenticatedLayout from 'layouts/AuthenticatedLayout';

import LoginPage from 'pages/LoginPage';
import Dashboard from 'pages/Dashboard';
import Resources from 'pages/Resources';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      userAccount: {},
    };

    this.onSignIn = this.onSignIn.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
  }

  onSignIn(userAccount) {
    this.setState({
      authenticated: true,
      userAccount,
    });
  }

  onSignOut() {
    this.setState({
      authenticated: false,
      userAccount: {},
    });
  }

  render() {
    return (
      <Router>
        <DefaultLayout exact path="/" component={LoginPage} onSignIn={this.onSignIn} authenticated={this.state.authenticated} />
        <AuthenticatedLayout exact path='/dashboard' onSignOut={this.onSignOut} component={Dashboard} {...this.state} />
        <AuthenticatedLayout exact path='/resources' onSignOut={this.onSignOut} component={Resources} {...this.state} />
      </Router>
    );
  }
}

export default App;