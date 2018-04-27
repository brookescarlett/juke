import React, { Component } from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

import Filter from '../components/Filter'
import Playlist from '../components/Playlist'
import Userlist from '../components/Userlist'
import NowPlaying from '../components/NowPlaying'
import Player from '../components/Player'

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
          <div>
            <Filter store={this.props.store}/>
            <Playlist store={this.props.store} />
            <Userlist store={this.props.store} />
            <NowPlaying store={this.props.store} />
            <Player store={this.props.store} />
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
