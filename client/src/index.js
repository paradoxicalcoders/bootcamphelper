import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

const router = (
  <Router>
    <div>
      <Route exact path="/" component={LoginPage} />
      <Route exact path="/dashboard" component={Dashboard} />
    </div>
  </Router>
)

ReactDOM.render(router, document.getElementById('root'));
registerServiceWorker();
