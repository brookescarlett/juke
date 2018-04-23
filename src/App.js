import './App.css'

import React, { Component } from 'react'
import {connect} from 'react-redux'

import Filter from './containers/Filter'
import Playlist from './containers/Playlist'

export default class App extends Component {

  render() {
    return (
      <div className="App">
        <Filter />
        <Playlist store={this.props.store} />
      </div>
    );
  }
}
