import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

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
      sessionChecked: false,
    };

    this.onSignIn = this.onSignIn.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
  }

  componentDidMount() {
    this.checkSession();
  }

  checkSession() {
    // If a page is refreshed and state is cleared, check session storage for a user.
    console.log('checking session');
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
  }

  onSignIn(userAccount) {
    window.sessionStorage.setItem('userAccount', JSON.stringify(userAccount));
    this.setState({
      authenticated: true,
      userAccount,
      sessionChecked: true,
    });
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
    console.log('rendering', this.state.userAccount);

    return (
      <Router>
        <Switch>
          <DefaultLayout exact path="/" component={LoginPage} onSignIn={this.onSignIn} authenticated={this.state.authenticated} />
          <AuthenticatedLayout exact path='/dashboard' onSignOut={this.onSignOut} component={Dashboard} {...this.state} />
          <AuthenticatedLayout exact path='/resources' onSignOut={this.onSignOut} component={Resources} {...this.state} />
        </Switch>
      </Router>
    );
  }
}

export default App;