import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import Login from '../routes/Login';
import Wallet from '../routes/Wallet';

export default class App extends Component {
  render () {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Login} />
        <Route path="/wallet" component={Wallet} />
      </Router>
    )
  }
}
