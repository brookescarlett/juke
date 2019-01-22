import './Main.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { SetDJ, SetChatroom, SetName, SetPlaylistId, fetchUser } from '../../actions/actions.js'
import { bindActionCreators } from 'redux'


import NavBar from '../Nav/NavBar'
import Filter from '../Filter/Filter'
import Playlist from '../Playlist/Playlist'
import Userlist from '../UserList/Userlist'
import NowPlaying from '../NowPlaying/NowPlaying'
import Player from '../NowPlaying/Player'
import Footer from '../Footer/Footer'

class Main extends Component {

  componentWillMount = () => {

    // if (localStorage.getItem('access_token')) {
    //   this.props.SetName(localStorage.getItem('name'))
    //   this.props.SetChatroom(localStorage.getItem('chatroom'))
    //   this.props.SetDJ(localStorage.getItem('dj'))
    //   this.props.SetPlaylistId(localStorage.getItem('pid'))

    // }
    if (this.props.chatroom === "") {
      this.props.history.push('/signup')
    }
  }

  render() {
    return (
      <div>
        { this.props.chatroom !== "" ? (
          <div className="main-container">
            <div id="bg-img"></div>
            <div className='animated fadeIn'>
            <NavBar />
            <Filter />
            <div className="flex-row">
              <div className="main-content">
                <Playlist  />
              </div>
              <div className="sidebar">
                <Userlist  />
                <Player  />
                <NowPlaying  />
              </div>
            </div>
            <Footer />
          </div>
          </div>
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { chatroom: state.chatroom }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    SetDJ, SetChatroom, SetPlaylistId, SetName
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
