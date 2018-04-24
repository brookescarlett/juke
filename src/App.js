import './App.css'

import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import {connect} from 'react-redux'

import SignUp from './containers/SignUp'
import Auth from './containers/Auth'
import Main from './containers/Main'

export default class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Switch>
              <Route exact path="/signup" render={(renderProps) => <SignUp store={ this.props.store } history={ renderProps.history }/>} />
              <Route exact path="/" render={(renderProps) => <Auth store={this.props.store} history={ renderProps.history }/>} />
              <Route exact path="/main" render={(renderProps) => <Main store={this.props.store} history={ renderProps.history }/>} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
