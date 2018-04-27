import './App.css'

import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import CreatePartyRoom from './containers/CreatePartyRoom'
import SignUp from './containers/SignUp'
import Auth from './containers/Auth'
import Main from './containers/Main'
import NavBar from './components/NavBar'

export default class App extends Component {

  render() {
    return (
      <div className="App">
        <NavBar />
        <Router>
          <div>
            <Switch>
              <Route exact path="/create" render={(renderProps) => <CreatePartyRoom store={ this.props.store } history={ renderProps.history }/>} />
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
