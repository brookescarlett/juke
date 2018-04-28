import './Main.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

import Filter from '../Filter/Filter'

import Playlist from '../Playlist/Playlist'

import Userlist from '../UserList/Userlist'

import NowPlaying from '../NowPlaying/NowPlaying'
import Player from '../NowPlaying/Player'

class Main extends Component {

  componentWillMount = () => {
    if (this.props.chatroom === "") {
      this.props.history.push('/signup')
    }
  }

  render() {
    return (
      <div>
        {this.props.chatroom !== "" ? (
          <div className="main-container">
            <Filter store={this.props.store}/>
            <div className="flex-row">
              <Userlist store={this.props.store} />
              <Playlist store={this.props.store} />
              <Player store={this.props.store} />
              <NowPlaying store={this.props.store} />
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {chatroom: state.chatroom}
}

export default connect(mapStateToProps)(Main)
