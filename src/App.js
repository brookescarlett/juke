import './App.css'

import React, { Component } from 'react'
import {BrowserRouter as Route, Switch} from 'react-router-dom'

import SignUp from './components/LogIn/SignUp'
import Auth from './components/LogIn/Auth'
import Main from './components/Main/Main'

export default class App extends Component {

  render() {
    return (
      <div className="App">
        <div>
          <Switch>
            <Route exact path="/signup" render={(renderProps) => <SignUp store={ this.props.store } history={ renderProps.history }/>} />
            <Route exact path="/" render={(renderProps) => <Auth store={this.props.store} history={ renderProps.history }/>} />
            <Route exact path="/main" render={(renderProps) => <Main store={this.props.store} history={ renderProps.history }/>} />
          </Switch>
        </div>
      </div>
    );
  }
}
