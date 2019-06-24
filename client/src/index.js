import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import LoginPage from './pages/LoginPage';

const router = (
  <Router>
    <div>
      <Route path="/" component={LoginPage} />
    </div>
  </Router>
)

ReactDOM.render(router, document.getElementById('root'));
registerServiceWorker();
