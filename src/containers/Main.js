import React, { Component } from 'react'

import Filter from '../components/Filter'
import Playlist from '../components/Playlist'
import NowPlaying from '../components/NowPlaying'
import Player from '../components/Player'

export default class App extends Component {

  render() {
    return (
      <div>
        <Filter store={this.props.store}/>
        <Playlist store={this.props.store} />
        <NowPlaying store={this.props.store} />
        <Player store={this.props.store} />
      </div>
    )
  }
}
