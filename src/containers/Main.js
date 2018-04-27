import React, { Component } from 'react'

import Filter from '../components/Filter'
import Playlist from '../components/Playlist'
import Userlist from '../components/Userlist'
import NowPlaying from '../components/NowPlaying'
import Player from '../components/Player'

export default class App extends Component {

  render() {
    return (
      <div>
        <Filter store={this.props.store}/>
        <Playlist store={this.props.store} />
        <Userlist store={this.props.store} />
        <NowPlaying store={this.props.store} />
        <Player store={this.props.store} />
      </div>
    )
  }
}
