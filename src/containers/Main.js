import React, { Component } from 'react'

import Filter from '../components/Filter'
import Playlist from '../components/Playlist'


export default class App extends Component {

  render() {
    return (
      <div>
        <Filter store={this.props.store}/>
        <Playlist store={this.props.store} />
      </div>
    )
  }
}
